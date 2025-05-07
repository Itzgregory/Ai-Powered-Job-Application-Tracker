import { useState } from "react";

interface ImageUploadProps {
  className?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ className = "" }) => {
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file && ["image/png", "image/jpeg"].includes(file.type)) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      alert("Only PNG and JPG files are allowed.");
    }
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <label className="w-24 h-24 rounded-full overflow-hidden border border-gray-300 cursor-pointer flex items-center justify-center">
        {image ? (
          <img src={image} alt="Uploaded" className="w-full h-full object-cover rounded-full" />
        ) : (
          <span className="text-gray-500 text-sm">Upload Avatar</span>
        )}
        <input type="file" accept=".png, .jpg" className="hidden" onChange={handleImageUpload} />
      </label>
    </div>
  );
};
