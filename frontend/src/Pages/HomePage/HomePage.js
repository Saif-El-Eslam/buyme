import "./HomePage.css";
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/Footer";
import CategoryCard from "../../components/CategoryCard/CategoryCard";

function HomePage() {
  return (
    <div className="home-page">
      <Header />
      <div className="home-page-content">
        <div className="section-1">
          <div className="section-1-wrapper">
            <div className="section-1-wrapper-title font-2">
              The best to buy All time, <br /> any occasion!
            </div>

            <div className="section-1-wrapper-slogan font-3">
              Fit all your needs.
            </div>

            <div className="button-wrapper font-3">
              <div className="button-white">Shop Now</div>
            </div>
          </div>
        </div>

        <div className="section-2">
          <div className="section-2-wrapper">
            <div className="section-2-wrapper-title font-2">
              From timeless classics to the latest trends, redefine your style
              with our curated collection.
            </div>

            <div className="section-2-wrapper-categories-icons">
              <div className="category-card-wrapper">
                <CategoryCard
                  category={"T-shirts"}
                  imgURL={"http://localhost:3001/categories/T-shirt.jpg"}
                />
              </div>
              <div className="category-card-wrapper">
                <CategoryCard
                  category={"Shirts"}
                  imgURL={"http://localhost:3001/categories/shirt.jpg"}
                />
              </div>

              <div className="category-card-wrapper">
                <CategoryCard
                  category={"Pants"}
                  imgURL={"http://localhost:3001/categories/pants.jpg"}
                />
              </div>

              <div className="category-card-wrapper">
                <CategoryCard
                  category={"Shorts"}
                  imgURL={"http://localhost:3001/categories/shorts.jpg"}
                />
              </div>

              <div className="category-card-wrapper">
                <CategoryCard
                  category={"Jackets"}
                  imgURL={"http://localhost:3001/categories/jacket.jpg"}
                />
              </div>

              <div className="category-card-wrapper">
                <CategoryCard
                  category={"Hoodies"}
                  imgURL={"http://localhost:3001/categories/hoodie.jpg"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
