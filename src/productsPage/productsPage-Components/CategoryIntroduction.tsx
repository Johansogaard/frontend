//Bruges som introduktion til alle kategorier af produkter. For at give et visuelt pænere og mere informativt UX. 
interface CategoryIntroductionProps {
    title: string;
    description: string;
  }
  
  const CategoryIntroduction: React.FC<CategoryIntroductionProps> = ({ title, description }) => {
    return (
      <div className="category-introduction">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    );
  };
  
  export default CategoryIntroduction;
  