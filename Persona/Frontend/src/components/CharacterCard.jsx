export default function CharacterCard({ character }) {
  return (
   <div className="carousel-image-display">
    <img 
    src={character.images[currentImageIndex]} 
    alt={`${character.name} view ${currentImageIndex + 1}`} 
    className="carousel-img-element"
    />
    </div>
  );
}