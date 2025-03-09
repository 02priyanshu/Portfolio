import React, { useEffect, useState, useRef } from 'react';
import './home.css';
import emailjs from '@emailjs/browser';

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [dynamicText, setDynamicText] = useState('');
  const [projectBgVisible, setProjectBgVisible] = useState(false);
  const [formStatus, setFormStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const projectsBgRef = useRef(null);
  const navbarRef = useRef(null);
  const formRef = useRef(null);
  
  const titles = ["Software Developer", "Machine Learning Engineer", "Data Analyst"];
  const titleIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const isDeletingRef = useRef(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus('Sending message...');

    emailjs.sendForm(
      'service_ixt96tu', 
      'template_75b8kwa', 
      formRef.current,
      '-DPokJ93uFAN9zQsl' 
    )
      .then((result) => {
        console.log('Email sent successfully!', result.text);
        setFormStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setFormStatus(''), 5000); 
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.error('Failed to send email:', error.text);
        setFormStatus('Failed to send message. Please try again.');
        setIsSubmitting(false);
      });
  };

  useEffect(() => {
    const typeEffect = () => {
      const currentTitle = titles[titleIndexRef.current];
      
      if (isDeletingRef.current) {
        setDynamicText(currentTitle.substring(0, charIndexRef.current - 1));
        charIndexRef.current--;
        
        if (charIndexRef.current === 0) {
          isDeletingRef.current = false;
          titleIndexRef.current = (titleIndexRef.current + 1) % titles.length;
        }
      } else {
        setDynamicText(currentTitle.substring(0, charIndexRef.current + 1));
        charIndexRef.current++;
        
        if (charIndexRef.current === currentTitle.length) {
          isDeletingRef.current = true;
        }
      }
      
      setTimeout(typeEffect, isDeletingRef.current ? 200 : 300);
    };
    
    typeEffect();
    
    return () => clearTimeout(typeEffect);
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setProjectBgVisible(true);
        } else {
          setProjectBgVisible(false);
        }
      });
    });
    
    if (projectsBgRef.current) {
      observer.observe(projectsBgRef.current);
    }
    
    const handleAnchorClick = (e) => {
      const href = e.currentTarget.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        const navHeight = navbarRef.current ? navbarRef.current.offsetHeight : 0;
        
        if (target) {
          window.scrollTo({
            top: target.offsetTop - navHeight,
            behavior: 'smooth'
          });
        }
        
        setIsMenuActive(false);
      }
    };
    
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      anchors.forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
    };
  }, []);

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} ref={navbarRef}>
        <div className="navbar-container">
          <a href="#" className="brand">Code</a>
          <ul className={`nav-links ${isMenuActive ? 'active' : ''}`}>
            <li><a href="#home">HOME</a></li>
            <li><a href="#experience">EXPERIENCE</a></li>
            <li><a href="#skills">SKILLS</a></li>
            <li><a href="#projects">PROJECTS</a></li>
            <li><a href="#education">EDUCATION</a></li>
            <li><a href="#ach">ACHIEVEMENTS</a></li>
            <li><a href="#contact">CONTACT</a></li>
          </ul>
          <div className="menu-toggle" onClick={() => setIsMenuActive(!isMenuActive)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      <section id="home" className="sec1">
        <div className="sec1-1">
          <div className="line">
            <div className="line-1"><h1>Hi ! I am Priyanshu Mudgal</h1></div>
            <div className="line-3"><h1><span id="dynamic-text">{dynamicText}</span></h1></div>
            <div className="resume"><a href="/Portfolio/Skills/Resume-new.pdf" target="_blank">Resume</a></div>
            <div className="about">
                <p>Currently in my final year of B.Tech in CSE specializing in AI & Machine Learning at Dronacharya College of Engineering with a strong 8.1 SGPA.</p>
                <p>I'm a data science enthusiast with proven experience in machine learning, computer vision, and predictive modeling. With multiple hackathon wins and internships at Credent Infotech and Maruti Suzuki, I blend technical expertise with a passion for solving real-world problems.</p>
            </div>
          </div>
          {/* <div className="image">
            <img src="mypic-remove.png" alt="Profile" />
          </div> */}
        </div>
      </section>

      <section id="experience" className="experience">
        <div className="experience-heading">
          <h1>Experience</h1>
        </div>
        <div className="experience-container">
          <div className="experience-1">
            <div className="experience-head">
              <h1>Credent Infotech Solutions</h1>
            </div>
            <div className="experience-role">
              <h4>Machine Learning Intern</h4>
              <p>March-2024 to Present</p>
              <ul>
                <li>Engineered a Business Operation Management System (BOMS) using React.js for frontend and Django for backend, improving operational efficiency by 30%.</li>
                <li>Developed a web-based OCR text extraction system with custom fine-tuned ML models, achieving 95% accuracy in document text recognition.</li>
                <li>Worked extensively on LLMs, Computer Vision, Deep Learning, SQL databases, React, and Django. </li>
              </ul>
            </div>
          </div>
          <hr />
          <div className="experience-1">
            <div className="experience-head">
              <h1>Maruti Suzuki India Limited</h1>
            </div>
            <div className="experience-role">
              <h4>Data Analyst Intern</h4>
              <p>June 2023 - July 2023</p>
              <ul>
                <li>Conducted comprehensive analysis of financial year call management dataset using Python (NumPy, Pandas, Matplotlib) </li>
                <li>Identified key patterns and generated actionable insights that led to 15% improvement in call 
                handling efficiency.</li>
                <li>Presented analytical findings to management, supporting data-driven decision-making processes.</li>
              </ul>
            </div>
          </div>
          <hr />
          <div className="experience-1">
            <div className="experience-head">
              <h1>IBM SkillsBuild</h1>
            </div>
            <div className="experience-role">
              <h4>Data Scientist</h4>
              <p>June 2023 - July 2023</p>
              <ul>
                <li>Developed a Mental Fitness Tracker model to predict mental health status across global populations.</li>
                <li>Implemented and optimized multiple ML algorithms including Linear Regression, Decision Trees, 
                SVM, and Random Forests.</li>
                <li>Performed end-to-end ML pipeline development: data preprocessing, feature selection, model 
                training, evaluation, and validation.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div id="skills" className="container">
        <div className="container-bg">
          <div className="cube-1">
            <div className="cube">
              <div className="top"><h1>Technical SKILLS</h1></div>
              <div>
                <span style={{ "--i": 0 }}></span>
                <span style={{ "--i": 1 }}></span>
                <span style={{ "--i": 2 }}></span>
                <span style={{ "--i": 3 }}></span>
              </div>
            </div>
          </div>
          <div className="skills-box">
            <div className="programming-languages">
              <h2>Programming Languages</h2>
              <div className="skills">
                <div className="skill"><img src="/Portfolio/Skills/python.png" alt="Python" />Python</div>
                <div className="skill"><img src="/Portfolio/Skills/java.png" alt="Java" />Java</div>
                <div className="skill"><img src="/Portfolio/Skills/c.png" alt="C" />C</div>
              </div>
              <div className="skills">
                <div className="skill"><img src="/Portfolio/Skills/mysql.png" alt="MySQL" />MYSQL</div>
                <div className="skill"><img src="/Portfolio/Skills/html.png" alt="HTML" />HTML</div>
                <div className="skill"><img src="/Portfolio/Skills/css.png" alt="CSS" />CSS</div>
              </div>
            </div>
            <div className="databases">
              <h2>Machine Learning</h2>
              <div className="skills">
                <div className="skill"><img src="/Portfolio/Skills/Statistical-Analysis-Tools-removebg-preview.png" alt="Statistical Modelling" />Statistical Modelling</div>
                <div className="skill"><img src="/Portfolio/Skills/Predictive-Modeling-removebg-preview.png" alt="Predictive Modelling" />Predictive Modelling</div>
                <div className="skill"><img src="/Portfolio/Skills/nlp-removebg-preview.png" alt="NLP" />NLP</div>
              </div>
              <div className="skills">
                <div className="skill"><img src="/Portfolio/Skills/Deep_Learning-removebg-preview.png" alt="Deep Learning" />Deep Learning</div>
                <div className="skill"><img src="/Portfolio/Skills/exploratory-data-analysis-removebg-preview.png" alt="Exploratory data Analysis" />Exploratory data Analysis</div>
              </div>
            </div>
          </div>
          <div className="skills-box">
            <div className="programming-languages">
              <h2>Packages</h2>
              <div className="skills">
                <div className="skill"><img src="/Portfolio/Skills/sklearn.png" alt="SkLearn" />SkLearn</div>
                <div className="skill"><img src="/Portfolio/Skills/tf-removebg-preview.png" alt="Tensorflow" />Tensorflow</div>
                <div className="skill"><img src="/Portfolio/Skills/opencv-removebg-preview.png" alt="OpenCV" />OpenCV</div>
              </div>
              <div className="skills">
                <div className="skill"><img src="/Portfolio/Skills/numpy-removebg-preview.png" alt="NumPy" />NumPY</div>
                <div className="skill"><img src="/Portfolio/Skills/pandas-removebg-preview.png" alt="Pandas" />Pandas</div>
                <div className="skill"><img src="/Portfolio/Skills/matplotlib-removebg-preview.png" alt="Matplotlib" />MatPlotlib</div>
              </div>
            </div>
            <div className="databases">
              <h2>Concepts</h2>
              <div className="skills">
                <div className="skill"><img src="/Portfolio/Skills/mlops.png" alt="MLops" />MLops</div>
                <div className="skill"><img src="/Portfolio/Skills/oop.jpg" alt="OOP" />OOP</div>
              </div>
              <div className="skills">
                <div className="skill"><img src="/Portfolio/Skills/dsa-removebg-preview.png" alt="DSA" />DSA</div>
              </div>
            </div>
          </div>
          <div className="skills-box">
            <div className="programming-languages">
              <h2>Frameworks & Tools</h2>
              <div className="skills">
                <div className="skill"><img src="/Portfolio/Skills/django-removebg-preview.png" alt="Django" />Django</div>
                <div className="skill"><img src="/Portfolio/Skills/flask-removebg-preview.png" alt="Flask" />Flask</div>
              </div>
              <div className="skills">
                <div className="skill"><img src="/Portfolio/Skills/vss-removebg-preview.png" alt="Visual Studio" />Visual Studio</div>
                <div className="skill"><img src="/Portfolio/Skills/jupyter-removebg-preview.png" alt="Jupyter Notebook" />Jupyter Notebook</div>
                <div className="skill"><img src="/Portfolio/Skills/collab-removebg-preview.png" alt="Google Collab" />Google Collab</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section id="projects" className="projects">
        <div className={`projects-bg ${projectBgVisible ? 'visible' : ''}`} ref={projectsBgRef}>
          <div className="projects-heading">
            <h1>Projects</h1>
          </div>
          <div className="project-data">
            <div className="project-box">
              <div className="project-img">
                <img src="/Portfolio/Skills/stocks-project.png" alt="Stock prediction project" />
              </div>
              <div className="project-box-content">
                <h1>AI-driven Stock Prediction Model</h1>
                <p>Developed an AI-driven stock prediction model to forecast future stock prices and determine optimal buy and sell points based on historical stock data and news sentiment analysis.</p>
                <p>Tech Used - Python, NLP, LSTM, SVM.</p>
              </div>
              <div className="project-button">
                <button><a href="https://github.com/02priyanshu/IntelliTrade---AI-driven-Stock-Prediction-Model.github.io.git">View Project</a></button>
              </div>
            </div>
            <div className="project-box">
              <div className="project-img">
                <img src="/Portfolio/Skills/plant-project.jpg" alt="Plant disease detection project" />
              </div>
              <div className="project-box-content">
                <h1>AI-Powered Plant Disease Detection and Prediction</h1>
                <p>The project aimed to revolutionize agriculture practices by providing farmers with actionable insights to improve crop health, optimize yield and make informed decisions on crop selection.</p>
                <p>Tech Used - Python, Sklearn, TensorFlow, CNN, RandomForestRegessor, RandomForestClassifier.</p>
              </div>
              <div className="project-button">
                <button><a href="https://github.com/02priyanshu/PlantGuard-AI-Powered-Plant-Disease-Detection-and-Prediction.git">View Project</a></button>
              </div>
            </div>
            <div className="project-box">
              <div className="project-img">
                <img src="/Portfolio/Skills/face-reco.jpeg" alt="Face recognition project" />
              </div>
              <div className="project-box-content">
                <h1>Face Recognition</h1>
                <p>I developed a face recognition model that predicts individuals' names from images, and extended it to process videos, detecting and identifying all appearing persons.</p>
                <p>Tech Stack : OpenCV, Cnn, TensorFlow, MTCNN</p>
              </div>
              <div className="project-button">
                <button><a href="#">View Project</a></button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="education" className="education">
        <div className="education-bg">
          <div className="education-heading">
            <h1>Education</h1>
          </div>
          <div className="education-container">
            <div className="education-details">
              <h1>B. Tech. CSE(Artificial Intelligence and Machine Learning)</h1>
              <ul>
                <li className="li-box1">Dronacharya College of Engineering, Gurugram</li>
                <li className="li-box">Affiliated to MDU, Rohtak</li>
                <li className="li-box1">Graduation Year : 2025</li>
                <li className="li-box">Average SGPA : 8.1</li>
              </ul>
              <hr />
            </div>
            <div className="education-details">
              <h1>Senior Seconday (PCM)</h1>
              <ul>
                <li className="li-box1">M.D. SENIOR SECONDARY SCHOOL</li>
                <li className="li-box">Affiliated to CBSE, Delhi</li>
                <li className="li-box1">Completion Year : 2021</li>
                <li className="li-box">Percentage : 77%</li>
              </ul>
              <hr />
            </div>
            <div className="education-details">
              <h1>Seconday</h1>
              <ul>
                <li className="li-box1">VIVEKANAND GLOBAL SCHOOL</li>
                <li className="li-box">Affiliated to CBSE, Delhi</li>
                <li className="li-box1">Completion Year : 2019</li>
                <li>Percentage : 87%</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="ach" className="ACHIEVEMENTS">
        <div className="ach-bg">
          <div className="ach-heading">
            <h1>Achievements</h1>
          </div>
          <div className="ach-container">
            <ul>
              <li className="ach-details">✔ 1st Runner-Up at the Innovation Design and Entrepreneurship Bootcamp (Edition 2 - Phase II). </li>
              <li className="ach-details">✔ 1st position Data Prophet (Hackathon) Organized by IIT BHU, Varanasi.</li>
              <li className="ach-details">✔ 1st position in Innovate and Iterate (Hackathon) organized by IIIT, Sri City, Andhra Pradesh.</li>
              <li className="ach-details">✔ Finalist of Hack to crack National level Hackathon organized by VIMEET, Maharashtra.</li>
              <li className="ach-details">✔ Finalist of Analytic Arena (Hackathon) organized by IIIT, Sri City, Andhra Pradesh.</li>
              <li className="ach-details">✔ 2nd position in Hack-o-relay organized by GDSC-DCE.</li>
              <li className="ach-details">✔ 1st position in Mavericks Dronathon.</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="contact-bg">
          <div className="contact-heading">
            <h1>Contact Me</h1>
          </div>
          <div className="contact-details">
            <div className="container1">
              <div className="form-wrapper">
                <h1>Drop a Message</h1>
                <form ref={formRef} onSubmit={handleSubmit}>
                  <label htmlFor="name">Name:</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="Enter name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    required 
                  />
                  
                  <label htmlFor="email">Email:</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="Enter Email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                  />
                  
                  <label htmlFor="message">Message:</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    placeholder="Enter Message" 
                    rows="4" 
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                  
                  <input 
                    type="hidden" 
                    name="to_email" 
                    value="work282003@gmail.com" 
                  />
                  
                  <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                  
                  {formStatus && (
                    <div className="form-status" style={{ 
                      marginTop: '10px', 
                      color: formStatus.includes('success') ? 'green' : 'red'
                    }}>
                      {formStatus}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>Copyright © 2024 | Priyanshu Mudgal</p>
      </footer>
    </>
  );
};

export default Home;