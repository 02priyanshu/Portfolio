import React, { useEffect, useState, useRef } from 'react';
import './home.css';
import emailjs from '@emailjs/browser';

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [dynamicText, setDynamicText] = useState('');
  const [formStatus, setFormStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // NOTE: We now observe ALL project sections, so this single ref isn't needed per-section.
  const navbarRef = useRef(null);
  const formRef = useRef(null);

  const titles = ["Software Developer", "Machine Learning Engineer", "Data Analyst"];
  const titleIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const isDeletingRef = useRef(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus('Sending message...');

    emailjs
      .sendForm(
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
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // Observe ALL .projects-bg containers for fade-up animation
    const observers = [];
    const targets = Array.from(document.querySelectorAll('.projects-bg'));
    targets.forEach((el) => {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('visible');
          } else {
            el.classList.remove('visible');
          }
        });
      });
      obs.observe(el);
      observers.push(obs);
    });

    const handleAnchorClick = (e) => {
      const href = e.currentTarget.getAttribute('href');
      if (href && href.startsWith('#')) {
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
    anchors.forEach((anchor) => anchor.addEventListener('click', handleAnchorClick));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observers.forEach((o) => o.disconnect());
      anchors.forEach((anchor) =>
        anchor.removeEventListener('click', handleAnchorClick)
      );
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
            {/* Keep main link to the first (Major) section */}
            <li><a href="#projects">PROJECTS</a></li>
            <li><a href="#education">EDUCATION</a></li>
            <li><a href="#ach">ACHIEVEMENTS</a></li>
            <li><a href="#contact">CONTACT</a></li>
          </ul>
          <div className="menu-toggle" onClick={() => setIsMenuActive(!isMenuActive)}>
            <span></span><span></span><span></span>
          </div>
        </div>
      </nav>

      <section id="home" className="sec1">
        <div className="sec1-1">
          <div className="line">
            <div className="line-1"><h1>Hi ! I am Priyanshu Mudgal</h1></div>
            <div className="line-3"><h1><span id="dynamic-text">{dynamicText}</span></h1></div>
            <div className="resume"><a href="/Portfolio/Skills/Resume-Priyanshu.pdf" target="_blank" rel="noreferrer">Resume</a></div>
            <div className="about">
              <p>I'm a Software Engineer at Credent Infotech Solution LLP, specializing in software development and AI/ML solutions.</p>
              <p>I hold a B.Tech in Computer Science and Engineering with a specialization in <span className='subTitle'>AI & Machine Learning</span>. My experience spans machine learning, computer vision, and predictive modeling, backed by hackathon wins and internships including one at Maruti Suzuki.</p>
            </div>
          </div>
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
              <div>
                <h4>Software Developer</h4>
                <p>April-2025 to Present</p>
                <ul>
                  <li>Developed time series forecasting system with React.js frontend and Django backend, using chronos-t5-large models to predict 6-month volume projections with 85% MAPE accuracy.</li>
                  <li>Developed a multi-tenant web-based OCR system by implementing custom fine-tuned ML models, resulting in 95% accurate extraction and transformation of document text into structured data formats.</li>
                </ul>
              </div>
              <div>
                <h4>Machine Learning Engineer</h4>
                <p>March-2024 to March-2025</p>
                <ul>
                  <li>Developed a Business Operation Management System (BOMS) using React.js for frontend and Django for backend, improving operational efficiency by 30%.</li>
                  <li>Engineered a real-time face recognition system by designing and implementing custom CNN architecture, resulting in 94% accurate multi-face detection across both image and video inputs, with 200ms response time and SQL database integration supporting 100+ identity profiles.</li>
                  <li>Worked extensively on LLMs, Computer Vision, Deep Learning, SQL databases, React, and Django. </li>
                </ul>
              </div>
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

      {/* =========================
          PROJECTS — MAJOR 
          ========================= */}
      <section id="projects" className="projects">
        <div className="projects-bg">
          <div className="projects-heading">
            <h1>Flagship Projects (Personal – Major)</h1>
          </div>

          <div className="project-data">
            {/* Dummy Project 1 */}
            <div className="project-box">
              <div className="project-img">
                <img src="/Portfolio/projects/interviewaihub.png" alt="Project placeholder" />
              </div>
              <div className="project-box-content">
                <h1>AI Interview Preparation Platform</h1>
                <p>
                  Developed full-stack AI-powered interview preparation platform. Implementing 6+ core features including resume analysis, cover letter generation, and mock interviews.
                </p>
                <p>Tech Used — Next.js, Django, LLMs, MySQL</p>
              </div>
              <div className="project-button">
                <button><a href="https://www.interviewaihub.com/">View Project</a></button>
              </div>
            </div>

            {/* Dummy Project 2 */}
            <div className="project-box">
              <div className="project-img">
                <img src="/Portfolio/projects/rag.png" alt="Project placeholder" />
              </div>
              <div className="project-box-content">
                <h1>Document Q/A using RAG</h1>
                <p>
                  Upload your files (PDFs, images) and interact with them through natural questions—RAG retrieves the right context and delivers accurate, cited answers.
                </p>
                <p>Tech Used — React.js, Django, Rag, MySQL</p>
              </div>
              <div className="project-button">
                <button><a href="https://rag.interviewaihub.com/">View Project</a></button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          PROJECTS — MINOR 
          ========================= */}
      <section id="projects-minor" className="projects">
        <div className="projects-bg">
          <div className="projects-heading">
            <h1>Personal Projects (Minor)</h1>
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
                <h1>Book-recommendation</h1>
                <p>An intelligent book recommendation tool that helps readers discover new books personalized to their interests.</p>
                <p>Tech Stack : Javascript, flask, KNN, TensorFlow, MTCNN</p>
              </div>
              <div className="project-button">
                <button><a href="https://github.com/02priyanshu/book-recommendation.git">View Project</a></button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          PROJECTS — CLIENT 
          ========================= */}
      <section id="projects-client" className="projects">
        <div className="projects-bg">
          <div className="projects-heading">
            <h1>Client Projects</h1>
          </div>

          <div className="project-data">
            {/* Client Project 1 */}
            <div className="project-box">
              <div className="project-img">
                <img src="/Portfolio/projects/ocr.png" alt="Client project placeholder" />
              </div>
              <div className="project-box-content">
                <h1>Bodhpatra-Document Processing Tool</h1>
                <p>Bodhpatra is a smart document processing tool where users can upload PDFs or images and instantly convert them into structured, usable data. It uses OCR and AI to extract text, tables, and key fields accurately, making unorganized documents easy to analyze and integrate.</p>
                <p>Tech Used — React, Django, MySQL, Azure AD, LLMs</p>
              </div>
              {/* <div className="project-button">
                <button><a href="#">View Project</a></button>
              </div> */}
            </div>

            {/* Client Project 2 */}
            <div className="project-box">
              <div className="project-img">
                <img src="/Portfolio/projects/forecasting.png" alt="Client project placeholder" />
              </div>
              <div className="project-box-content">
                <h1>Forecasting Tool</h1>
                <p>An AI-powered forecasting tool designed to analyze historical trade data and predict both the volume and price of medicine imports and exports. It helps businesses and policymakers anticipate market demand, plan logistics, and make informed decisions in the pharmaceutical supply chain.</p>
                <p>Tech Used — React, Django, Chronos-T5 LLM, MySQL</p>
              </div>
              {/* <div className="project-button">
                <button><a href="#">View Project</a></button>
              </div> */}
            </div>

            {/* Client Project 3 */}
            <div className="project-box">
              <div className="project-img">
                <img src="/Portfolio/projects/entity.png" alt="Client project placeholder" />
              </div>
              <div className="project-box-content">
                <h1>Business System Operation Management System</h1>
                <p>A web-based system to easily create and manage RFPs, RFQs, and quotations, helping teams work faster and more efficiently.</p>
                <p>Tech Used — React, Django REST, MySQL</p>
              </div>
              {/* <div className="project-button">
                <button><a href="#">View Project</a></button>
              </div> */}
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
