"use client";

import { useState } from "react";
import { uploadImage } from "@/lib/cloudinary";
import { createProduct } from "@/services/productService";
import { toast } from "react-toastify";
import { 
  Plus, 
  Trash2, 
  Image as ImageIcon, 
  ChevronRight, 
  Layers, 
  Tag 
} from "lucide-react";

export default function ProductForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [variants, setVariants] = useState([
    { label: "250gm", price: "", stock: "" },
    { label: "500gm", price: "", stock: "" }
  ]);

  const [offers, setOffers] = useState([{ qty: 2, discount: 10 }]);

  const addVariant = () => setVariants([...variants, { label: "", price: "", stock: "" }]);
  const updateVariant = (i, field, value) => {
    const updated = [...variants];
    updated[i][field] = value;
    setVariants(updated);
  };
  const removeVariant = (i) => setVariants(variants.filter((_, idx) => idx !== i));

  const addOffer = () => setOffers([...offers, { qty: "", discount: "" }]);
  const updateOffer = (i, field, value) => {
    const updated = [...offers];
    updated[i][field] = value;
    setOffers(updated);
  };
  const removeOffer = (i) => setOffers(offers.filter((_, idx) => idx !== i));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category || images.length === 0) {
      toast.error("Please fill all required fields");
      return;
    }
    setLoading(true);
    try {
      const uploadedImages = await Promise.all(images.map((img) => uploadImage(img)));
      const cleanVariants = variants
        .filter(v => v.label && v.price)
        .map(v => ({ label: v.label, price: Number(v.price), stock: Number(v.stock || 0) }));

      const totalStock = cleanVariants.reduce((acc, curr) => acc + curr.stock, 0);
      const cleanOffers = offers
        .filter(o => o.qty && o.discount)
        .map(o => ({ qty: Number(o.qty), discount: Number(o.discount) }));

      await createProduct({
        name, description, category,
        images: uploadedImages,
        mainImage: uploadedImages?.[0] || "",
        variants: cleanVariants,
        tieredDiscounts: cleanOffers,
        inStock: totalStock > 0,
        createdAt: new Date()
      });

      toast.success("Product Added Successfully✅");
      setName(""); setImages([]);
    } catch (err) {
      toast.error("Failed to Add Product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/70 backdrop-blur-xl border border-white p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-black/[0.03] space-y-12">
      <div className="flex flex-col md:flex-row justify-between gap-6 border-b border-[#D2C1B0]/30 pb-10">
        <h2 className="text-2xl font-serif italic text-[#2D1B0D]">Add Product</h2>
        <div className="flex items-center gap-2">
           <div className={`w-2 h-2 rounded-full ${loading ? 'bg-amber-400 animate-pulse' : 'bg-green-500'}`} />
           <span className="text-[10px] font-black uppercase tracking-widest opacity-60">
             {loading ? "Uploading Images..." : " Ready"}
           </span>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-[#A68966] ml-2">Product Name</label>
          <input
            value={name} onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Classic Roasted Makhana"
            className="w-full bg-white/50 border border-white/60 p-5 rounded-2xl text-sm outline-none focus:bg-white transition-all shadow-sm italic"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-[#A68966] ml-2">Category</label>
          <select
            value={category} onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-white/50 border border-white/60 p-5 rounded-2xl text-sm outline-none focus:bg-white transition-all shadow-sm italic appearance-none"
            required
          >
            <option value="">Select Type</option>
            <option value="plain-makhana">Plain Makhana</option>
            <option value="modern-makhana">Modern Savory Makhana</option>
            <option value="sweet-makhana">Sweet Makhana</option>
            <option value="fusion-makhana">Fusion Spicy Makhana </option>
            <option value="whey-protein"> Whey Protein</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-[#A68966] ml-2">Product Description</label>
        <textarea
          value={description} onChange={(e) => setDescription(e.target.value)}
          placeholder="Write a description of the product..."
          className="w-full bg-white/50 border border-white/60 p-5 rounded-2xl min-h-[120px] text-sm outline-none focus:bg-white transition-all shadow-sm italic"
        />
      </div>

      {/* Image Gallery */}
      <div className="bg-[#F4EDE4]/50 p-8 rounded-[2rem] border border-white">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8B5E3C] mb-6 flex items-center gap-2">
          <ImageIcon size={14} /> Product Images
        </h3>
        <div className="flex flex-wrap gap-4">
          <label className="w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed border-[#D2C1B0] rounded-2xl cursor-pointer hover:bg-white transition-all text-[#A68966] group">
            <Plus size={20} className="group-hover:rotate-90 transition-transform" />
            <input type="file" multiple className="hidden" onChange={(e) => setImages([...images, ...Array.from(e.target.files)])} />
          </label>
          {images.map((img, i) => (
            <div key={i} className="relative w-24 h-24 group">
              <img src={URL.createObjectURL(img)} className="w-full h-full object-cover rounded-2xl shadow-md" />
              <button onClick={() => setImages(images.filter((_, idx) => idx !== i))} className="cursor-pointer absolute -top-2 -right-2 bg-[#2D1B0D]  hover:text-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                <Trash2 size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Variants and Offers */}
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8B5E3C] flex items-center gap-2">
              <Layers size={14} /> Product Size & Pricing
            </h3>
            <button type="button" onClick={addVariant} className="text-[9px] font-bold uppercase cursor-pointer tracking-widest text-[#2D1B0D] underline underline-offset-4">Add Size</button>
          </div>
          <div className="space-y-3">
            {variants.map((v, i) => (
              <div key={i} className="flex gap-3 animate-in slide-in-from-left duration-300">
                <input placeholder="Size" value={v.label} onChange={(e) => updateVariant(i, "label", e.target.value)} className="w-1/3 bg-white/50 border p-4 rounded-xl text-xs outline-none focus:bg-white" />
                <input type="number" placeholder="Price" value={v.price} onChange={(e) => updateVariant(i, "price", e.target.value)} className="w-1/3 bg-white/50 border p-4 rounded-xl text-xs outline-none focus:bg-white" />
                <input type="number" placeholder="Stock" value={v.stock} onChange={(e) => updateVariant(i, "stock", e.target.value)} className="w-1/4 bg-white/50 border p-4 rounded-xl text-xs outline-none focus:bg-white" />
                <button type="button" onClick={() => removeVariant(i)} className="text-[#A68966] hover:text-red-500 cursor-pointer transition-colors"><Trash2 size={14} /></button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8B5E3C] flex items-center gap-2">
              <Tag size={14} /> Discount Offers
            </h3>
            <button type="button" onClick={addOffer} className="text-[9px] font-bold uppercase cursor-pointer tracking-widest text-[#2D1B0D] underline underline-offset-4">Add Offer</button>
          </div>
          <div className="space-y-3">
            {offers.map((o, i) => (
              <div key={i} className="flex gap-3 items-center bg-[#F4EDE4]/30 p-2 rounded-2xl border border-white">
                <div className="flex items-center gap-2 flex-1 pl-2">
                  <span className="text-[9px] font-black text-[#A68966]">Buy Quantity</span>
                  <input type="number" value={o.qty} onChange={(e) => updateOffer(i, "qty", e.target.value)} className="w-full bg-transparent outline-none text-xs font-bold" />
                </div>
                <div className="flex items-center gap-2 flex-1 border-l pl-4">
                  <input type="number" value={o.discount} onChange={(e) => updateOffer(i, "discount", e.target.value)} className="w-full bg-transparent outline-none text-xs font-bold text-[#8B5E3C]" />
                  <span className="text-[9px] font-black text-[#8B5E3C]">Discount %</span>
                </div>
                <button type="button" onClick={() => removeOffer(i)} className="p-2 text-[#A68966] cursor-pointer hover:text-red-600"><Trash2 size={14} /></button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        type="submit" disabled={loading}
        className="w-100 bg-[#2D1B0D] cursor-pointer hover:bg-amber-500 hover:text-amber-900 duration-500 text-[#F4EDE4] py-4 rounded-4xl text-sm font-serif font-black uppercase tracking-[0.5em] transition-all shadow-xl hover:shadow-black/20 flex items-center justify-center gap-4"
      >
        {loading ? "Saving Product..." : <>Add Product <ChevronRight size={16} className="group-hover:translate-x-2 transition-transform" /></>}
      </button>
    </form>
  );
}