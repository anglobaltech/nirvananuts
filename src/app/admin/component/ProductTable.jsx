"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { updateProduct, deleteProduct } from "@/services/productService";
import { toast } from "react-toastify";
import { Settings, X, Package, Tag, Save, Zap, Edit3, Trash2 } from "lucide-react";

export default function ProductTable() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newImageFile, setNewImageFile] = useState(null);
  const [newImages, setNewImages] = useState([]);

  const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Delete this product?");
  
  if (!confirmDelete) return;

  try {
    await deleteProduct(id);
    toast.success("Product deleted");
    fetchProducts();
  } catch (error) {
    toast.error("Delete failed");
  }
};

  const fetchProducts = async () => {
    try {
      const snapshot = await getDocs(collection(db, "products"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(data);
    } catch (error) { toast.error("Database unavailable"); }
  };

  useEffect(() => { fetchProducts(); }, []);

  const openManageModal = (p) => { setCurrentProduct({ ...p }); setIsModalOpen(true); };
  const closeManageModal = () => { setIsModalOpen(false); setCurrentProduct(null); };

const saveChanges = async () => {
  setLoading(true);

  try {
    const totalStock =
      currentProduct.variants.reduce(
        (acc, v) => acc + Number(v.stock || 0),
        0
      );

    let uploadedNewImages = [];

    if (newImages.length > 0) {
      const { uploadImage } = await import("@/lib/cloudinary");

      uploadedNewImages = await Promise.all(
        newImages.map((img) => uploadImage(img.file))
      );
    }

    const finalImages = [
      ...(currentProduct.images || []),
      ...uploadedNewImages,
    ];

    await updateProduct(currentProduct.id, {
      ...currentProduct,
      images: finalImages,
      image: finalImages[0] || "",
      inStock: totalStock > 0,
    });

    toast.success("Asset Updated");
    fetchProducts();
    closeManageModal();
    setNewImages([]);

  } catch (err) {
    toast.error("Sync Failure");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-serif italic text-[#2D1B0D]">Asset Registry</h2>
          <p className="text-xs font-bold uppercase tracking-widest text-[#A68966]">Live Archive</p>
        </div>
      </div>
      
      {/* Table - Desktop View */}
      <div className="hidden lg:block bg-white/60 backdrop-blur-xl rounded-[3rem] border border-white overflow-hidden shadow-2xl shadow-black/[0.02]">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#D2C1B0]/30">
              <th className="p-10 text-[10px] font-black uppercase tracking-[0.3em] text-[#A68966]">Asset Identity</th>
              <th className="p-10 text-[10px] font-black uppercase tracking-[0.3em] text-[#A68966]">Status</th>
              <th className="p-10 text-right text-[10px] font-black uppercase tracking-[0.3em] text-[#A68966]">Control</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D2C1B0]/20">
            {products.map(p => (
              <tr key={p.id} className="group hover:bg-white/80 transition-colors">
                <td className="p-10">
                  <div className="flex items-center gap-6">
                    <img src={p.image} className="w-20 h-20 rounded-3xl object-cover shadow-sm group-hover:scale-105 transition-transform" />
                    <div>
                      <p className="font-bold text-[#2D1B0D] tracking-tight text-xl">{p.name}</p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#A68966] mt-2 italic opacity-60">{p.category}</p>
                    </div>
                  </div>
                </td>
                <td className="p-10">
                  <span className={`inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${p.inStock ? 'text-green-600' : 'text-red-400'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${p.inStock ? 'bg-green-500' : 'bg-red-400'}`} />
                    {p.inStock ? 'In Circulation' : 'Depleted'}
                  </span>
                </td>
                <td className="p-10">
  <div className="flex justify-end gap-3">
    
    <button
      onClick={() => openManageModal(p)}
      className="p-4 bg-[#2D1B0D] text-white rounded-full hover:bg-black transition-all shadow-lg shadow-black/10"
    >
      <Edit3 size={16} />
    </button>

    <button
      onClick={() => handleDelete(p.id)}
      className="p-4 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all shadow-lg"
    >
      <Trash2 size={16} />
    </button>

  </div>
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card View - Mobile */}
      <div className="lg:hidden grid gap-6">
        {products.map(p => (
          <div key={p.id} className="bg-white/70 p-6 rounded-[2.5rem] border border-white flex flex-col gap-6 shadow-sm">
             <div className="flex items-center gap-4">
                <img src={p.image} className="w-16 h-16 rounded-2xl object-cover" />
                <div>
                   <h3 className="font-bold text-[#2D1B0D]">{p.name}</h3>
                   <p className="text-[10px] uppercase font-black tracking-widest text-[#A68966]">{p.category}</p>
                </div>
             </div>
             <div className="flex gap-3">
  
  <button
    onClick={() => openManageModal(p)}
    className="flex-1 bg-[#2D1B0D] text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest"
  >
    Manage
  </button>

  <button
    onClick={() => handleDelete(p.id)}
    className="px-5 bg-red-500 text-white rounded-2xl"
  >
    <Trash2 size={16} />
  </button>

</div>
          </div>
        ))}
      </div>

      {/* Edit Modal (Redesigned) */}
     {/* Edit Modal (Redesigned) */}
{isModalOpen && currentProduct && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
    <div
      className="absolute inset-0 bg-[#2D1B0D]/40 backdrop-blur-xl"
      onClick={closeManageModal}
    />

    <div className="bg-[#F4EDE4] w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-[3rem] shadow-2xl relative z-10 p-10 animate-in zoom-in duration-300">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <h3 className="text-2xl font-serif italic">
          Modify Asset
        </h3>

        <button
          onClick={closeManageModal}
          className="text-[#A68966]"
        >
          <X size={24} />
        </button>
      </div>

      <div className="space-y-10">

        {/* PRODUCT NAME */}
        <input
          value={currentProduct.name}
          onChange={(e) =>
            setCurrentProduct({
              ...currentProduct,
              name: e.target.value,
            })
          }
          className="w-full bg-white border border-white p-5 rounded-2xl outline-none italic text-xl font-serif shadow-sm"
        />

{/* PRODUCT IMAGES (DRAG & DROP + GALLERY EDIT) */}
{/* PRODUCT IMAGES (ADD / DELETE / REPLACE) */}
<div className="space-y-4">
  <h4 className="text-[10px] font-black uppercase tracking-widest text-[#A68966]">
    Product Images
  </h4>

  {/* DROP ZONE */}
  <div
    onDragOver={(e) => e.preventDefault()}
    onDrop={(e) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files);
      const updated = files.map((f) => ({
        file: f,
        url: URL.createObjectURL(f),
      }));

      setNewImages((prev) => [...prev, ...updated]);
    }}
    className="w-full p-6 border-2 border-dashed border-[#D2C1B0] rounded-2xl bg-white"
  >
    <label className="cursor-pointer text-xs font-bold text-[#A68966]">
      Click or Drag & Drop Images Here
      <input
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const files = Array.from(e.target.files);
          const updated = files.map((f) => ({
            file: f,
            url: URL.createObjectURL(f),
          }));

          setNewImages((prev) => [...prev, ...updated]);
        }}
      />
    </label>

    {/* IMAGE GRID */}
    <div className="flex flex-wrap gap-3 mt-4">

      {/* EXISTING IMAGES (DELETE + REPLACE) */}
      {currentProduct.images?.map((img, i) => (
        <div key={i} className="relative group">
          
          <img
            src={img}
            className="w-20 h-20 object-cover rounded-xl border"
          />

          {/* DELETE */}
          <button
            onClick={() => {
              const updated = currentProduct.images.filter(
                (_, idx) => idx !== i
              );

              setCurrentProduct({
                ...currentProduct,
                images: updated,
              });
            }}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"
          >
            <Trash2 size={12} />
          </button>

          {/* REPLACE */}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id={`replace-${i}`}
            onChange={async (e) => {
              const file = e.target.files[0];
              if (!file) return;

              const { uploadImage } = await import("@/lib/cloudinary");
              const url = await uploadImage(file);

              const updated = [...currentProduct.images];
              updated[i] = url;

              setCurrentProduct({
                ...currentProduct,
                images: updated,
              });
            }}
          />

          <label
            htmlFor={`replace-${i}`}
            className="absolute bottom-0 left-0 right-0 text-[8px] text-center bg-black/60 text-white opacity-0 group-hover:opacity-100 cursor-pointer"
          >
            Change
          </label>
        </div>
      ))}

      {/* NEW IMAGES (REMOVE BEFORE SAVE) */}
      {newImages.map((img, i) => (
        <div key={i} className="relative group">

          <img
            src={img.url}
            className="w-20 h-20 object-cover rounded-xl border"
          />

          <button
            onClick={() => {
              setNewImages(newImages.filter((_, idx) => idx !== i));
            }}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"
          >
            <Trash2 size={12} />
          </button>
        </div>
      ))}
    </div>
  </div>
</div>

        {/* VARIANTS */}
        <div className="space-y-4">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-[#A68966]">
            Unit Adjustments
          </h4>

          {currentProduct.variants.map((v, i) => (
            <div
              key={i}
              className="grid grid-cols-3 gap-4"
            >
              <input
                value={v.label}
                className="bg-white/50 p-4 rounded-xl text-xs outline-none"
                readOnly
              />

              <input
                type="number"
                value={v.price}
                onChange={(e) => {
                  const upd = [...currentProduct.variants];
                  upd[i].price = Number(e.target.value);

                  setCurrentProduct({
                    ...currentProduct,
                    variants: upd,
                  });
                }}
                className="bg-white p-4 rounded-xl text-xs outline-none"
              />

              <input
                type="number"
                value={v.stock}
                onChange={(e) => {
                  const upd = [...currentProduct.variants];
                  upd[i].stock = Number(e.target.value);

                  setCurrentProduct({
                    ...currentProduct,
                    variants: upd,
                  });
                }}
                className="bg-white p-4 rounded-xl text-xs outline-none"
              />
            </div>
          ))}
        </div>

        {/* OFFERS */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-[#A68966]">
              Tier Offers
            </h4>

            <button
              type="button"
              onClick={() => {
                setCurrentProduct({
                  ...currentProduct,
                  tieredDiscounts: [
                    ...(currentProduct.tieredDiscounts || []),
                    { qty: "", discount: "" },
                  ],
                });
              }}
              className="text-xs font-bold text-[#2D1B0D]"
            >
              + Add Offer
            </button>
          </div>

          {(currentProduct.tieredDiscounts || []).map((offer, i) => (
            <div
              key={i}
              className="flex gap-4 items-center"
            >
              <input
                type="number"
                value={offer.qty}
                placeholder="Qty"
                onChange={(e) => {
                  const upd = [...currentProduct.tieredDiscounts];
                  upd[i].qty = Number(e.target.value);

                  setCurrentProduct({
                    ...currentProduct,
                    tieredDiscounts: upd,
                  });
                }}
                className="flex-1 bg-white p-4 rounded-xl text-xs outline-none"
              />

              <input
                type="number"
                value={offer.discount}
                placeholder="% Off"
                onChange={(e) => {
                  const upd = [...currentProduct.tieredDiscounts];
                  upd[i].discount = Number(e.target.value);

                  setCurrentProduct({
                    ...currentProduct,
                    tieredDiscounts: upd,
                  });
                }}
                className="flex-1 bg-white p-4 rounded-xl text-xs outline-none"
              />

              <button
                type="button"
                onClick={() => {
                  const upd =
                    currentProduct.tieredDiscounts.filter(
                      (_, idx) => idx !== i
                    );

                  setCurrentProduct({
                    ...currentProduct,
                    tieredDiscounts: upd,
                  });
                }}
                className="text-red-500"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={saveChanges}
          disabled={loading}
          className="w-full bg-[#2D1B0D] text-white py-5 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.4em] shadow-xl"
        >
          {loading
            ? "Synchronizing..."
            : "Overwrite and Save"}
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}