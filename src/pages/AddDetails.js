import React, { useState } from 'react';
import './AddDetails.css';

function AddDetails({ data, onUpdate }) {
  const [activeTab, setActiveTab] = useState('personal');
  const [personalInfo, setPersonalInfo] = useState(data.personalInfo);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    technologies: '',
    link: ''
  });
  const [newSkill, setNewSkill] = useState('');
  const [newExperience, setNewExperience] = useState({
    company: '',
    position: '',
    duration: '',
    description: ''
  });
  const [successMessage, setSuccessMessage] = useState('');

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({
      ...personalInfo,
      [name]: value
    });
  };

  const updatePersonalInfo = () => {
    onUpdate({
      ...data,
      personalInfo
    });
    showSuccess('Personal information updated!');
  };

  const handleAddProject = () => {
    if (!newProject.title || !newProject.description) {
      alert('Please fill in title and description');
      return;
    }

    const project = {
      id: data.projects.length + 1,
      ...newProject,
      technologies: newProject.technologies.split(',').map(t => t.trim()),
      image: ''
    };

    onUpdate({
      ...data,
      projects: [...data.projects, project]
    });

    setNewProject({
      title: '',
      description: '',
      technologies: '',
      link: ''
    });
    showSuccess('Project added successfully!');
  };

  const handleAddSkill = () => {
    if (!newSkill.trim()) {
      alert('Please enter a skill');
      return;
    }

    if (data.skills.includes(newSkill.trim())) {
      alert('This skill already exists');
      return;
    }

    onUpdate({
      ...data,
      skills: [...data.skills, newSkill.trim()]
    });

    setNewSkill('');
    showSuccess('Skill added successfully!');
  };

  const handleAddExperience = () => {
    if (!newExperience.company || !newExperience.position) {
      alert('Please fill in company and position');
      return;
    }

    const experience = {
      id: data.experience.length + 1,
      ...newExperience
    };

    onUpdate({
      ...data,
      experience: [...data.experience, experience]
    });

    setNewExperience({
      company: '',
      position: '',
      duration: '',
      description: ''
    });
    showSuccess('Experience added successfully!');
  };

  const deleteSkill = (skillToDelete) => {
    onUpdate({
      ...data,
      skills: data.skills.filter(skill => skill !== skillToDelete)
    });
    showSuccess('Skill deleted!');
  };

  const deleteProject = (projectId) => {
    onUpdate({
      ...data,
      projects: data.projects.filter(p => p.id !== projectId)
    });
    showSuccess('Project deleted!');
  };

  const deleteExperience = (experienceId) => {
    onUpdate({
      ...data,
      experience: data.experience.filter(e => e.id !== experienceId)
    });
    showSuccess('Experience deleted!');
  };

  return (
    <main className="add-details">
      <div className="container">
        <h1>Manage Your Portfolio</h1>
        
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        <div className="tabs">
          <button
            className={`tab-button ${activeTab === 'personal' ? 'active' : ''}`}
            onClick={() => setActiveTab('personal')}
          >
            Personal Info
          </button>
          <button
            className={`tab-button ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            Projects
          </button>
          <button
            className={`tab-button ${activeTab === 'skills' ? 'active' : ''}`}
            onClick={() => setActiveTab('skills')}
          >
            Skills
          </button>
          <button
            className={`tab-button ${activeTab === 'experience' ? 'active' : ''}`}
            onClick={() => setActiveTab('experience')}
          >
            Experience
          </button>
        </div>

        {/* Personal Info Tab */}
        {activeTab === 'personal' && (
          <div className="tab-content">
            <h2>Personal Information</h2>
            <form className="form-group">
              <div className="form-row">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={personalInfo.name}
                  onChange={handlePersonalInfoChange}
                />
                <input
                  type="text"
                  name="title"
                  placeholder="Professional Title"
                  value={personalInfo.title}
                  onChange={handlePersonalInfoChange}
                />
              </div>
              <textarea
                name="bio"
                placeholder="Bio"
                value={personalInfo.bio}
                onChange={handlePersonalInfoChange}
                rows="4"
              />
              <div className="form-row">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={personalInfo.email}
                  onChange={handlePersonalInfoChange}
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={personalInfo.phone}
                  onChange={handlePersonalInfoChange}
                />
              </div>
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={personalInfo.location}
                onChange={handlePersonalInfoChange}
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={updatePersonalInfo}
              >
                Save Personal Info
              </button>
            </form>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="tab-content">
            <h2>Add New Project</h2>
            <form className="form-group">
              <input
                type="text"
                placeholder="Project Title"
                value={newProject.title}
                onChange={(e) => setNewProject({...newProject, title: e.target.value})}
              />
              <textarea
                placeholder="Project Description"
                value={newProject.description}
                onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                rows="3"
              />
              <input
                type="text"
                placeholder="Technologies (comma-separated)"
                value={newProject.technologies}
                onChange={(e) => setNewProject({...newProject, technologies: e.target.value})}
              />
              <input
                type="url"
                placeholder="Project Link"
                value={newProject.link}
                onChange={(e) => setNewProject({...newProject, link: e.target.value})}
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddProject}
              >
                Add Project
              </button>
            </form>

            <h3>Your Projects</h3>
            <div className="items-list">
              {data.projects.map((project) => (
                <div key={project.id} className="item-card">
                  <h4>{project.title}</h4>
                  <p>{project.description}</p>
                  <div className="tech-tags">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx}>{tech}</span>
                    ))}
                  </div>
                  <button
                    className="delete-btn"
                    onClick={() => deleteProject(project.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div className="tab-content">
            <h2>Add New Skill</h2>
            <div className="skill-input">
              <input
                type="text"
                placeholder="Enter a skill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
              />
              <button
                className="btn btn-primary"
                onClick={handleAddSkill}
              >
                Add Skill
              </button>
            </div>

            <h3>Your Skills</h3>
            <div className="skills-display">
              {data.skills.map((skill, index) => (
                <div key={index} className="skill-badge">
                  <span>{skill}</span>
                  <button
                    className="close-btn"
                    onClick={() => deleteSkill(skill)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience Tab */}
        {activeTab === 'experience' && (
          <div className="tab-content">
            <h2>Add New Experience</h2>
            <form className="form-group">
              <input
                type="text"
                placeholder="Company"
                value={newExperience.company}
                onChange={(e) => setNewExperience({...newExperience, company: e.target.value})}
              />
              <input
                type="text"
                placeholder="Position"
                value={newExperience.position}
                onChange={(e) => setNewExperience({...newExperience, position: e.target.value})}
              />
              <input
                type="text"
                placeholder="Duration (e.g., 2020 - Present)"
                value={newExperience.duration}
                onChange={(e) => setNewExperience({...newExperience, duration: e.target.value})}
              />
              <textarea
                placeholder="Description"
                value={newExperience.description}
                onChange={(e) => setNewExperience({...newExperience, description: e.target.value})}
                rows="3"
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddExperience}
              >
                Add Experience
              </button>
            </form>

            <h3>Your Experience</h3>
            <div className="items-list">
              {data.experience.map((exp) => (
                <div key={exp.id} className="item-card">
                  <h4>{exp.position}</h4>
                  <p className="company-name">{exp.company}</p>
                  <p className="duration">{exp.duration}</p>
                  <p>{exp.description}</p>
                  <button
                    className="delete-btn"
                    onClick={() => deleteExperience(exp.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default AddDetails;
