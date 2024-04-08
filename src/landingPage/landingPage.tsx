import './landingPage.css';
import diningSet from '../assets/images/DiningSet.webp';


const LandingPage = () => {
  return (
    <div className="landing-page-container">
      <div className="image-container">
        <img
          className="background-image"
          src={diningSet}
          alt="Dining Set"
        />
        <div className="content-box">
          <div className="overlay-text">
            <h1 className="title">Welcome to Our Home Collection</h1>
            <p className="introduction">Step into a world where each plate, cup, and utensil is a testament to timeless design and exquisite functionality, crafted to enrich your dining experience. Step into a realm of sophisticated design and exceptional quality. Each piece is a testament to beauty and functionality, ready to transform your table into canvas of memorable moments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
