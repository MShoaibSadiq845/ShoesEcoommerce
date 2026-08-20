'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import toast from 'react-hot-toast';
import { useAddToCartMutation } from '../../redux/cartApi';
import { useAppSelector } from '../../redux/hooks';
import { useRouter } from 'next/navigation';

export interface HygraphImage {
  url: string;
}

export interface HygraphProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  tag: string;
  brand: string;
  image: HygraphImage | null;
}

const GET_PRODUCTS_QUERY = `
  query GetHygraphProducts {
    productsses {
      id
      name
      price
      description
      category
      tag
      brand
      image {
        url
      }
    }
  }
`;

export default function HygraphProductsPage() {
  const router = useRouter();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const [addToCart, { isLoading: isAdding }] = useAddToCartMutation();

  const [products, setProducts] = useState<HygraphProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const fetchHygraphProducts = async () => {
    setLoading(true);
    setError(null);
    const endpoint =
      process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT ||
      'https://ap-south-1.cdn.hygraph.com/content/cmt18xrox03nv07uus0lgp5sp/master';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: GET_PRODUCTS_QUERY,
        }),
      });

      if (!res.ok) {
        throw new Error(`Hygraph API error: ${res.statusText}`);
      }

      const json = await res.json();
      if (json.errors && json.errors.length > 0) {
        throw new Error(json.errors[0].message);
      }

      const fetchedData: HygraphProduct[] = json?.data?.productsses || [];
      setProducts(fetchedData);
    } catch (err: any) {
      console.error('Failed to fetch from Hygraph:', err);
      setError(err?.message || 'Failed to load products from Hygraph CMS');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHygraphProducts();
  }, []);

  const handleAddToCart = async (product: HygraphProduct) => {
    if (!isAuthenticated) {
      toast.error('Please log in to add items to your cart!');
      router.push('/login');
      return;
    }

    try {
      const img = product.image?.url || '/images/4.png';
      await addToCart({
        productId: product.id,
        quantity: 1,
        size: 'US 10',
        name: product.name,
        price: Number(product.price),
        imageUrl: img,
        category: product.category || 'FOOTWEAR',
      }).unwrap();
      toast.success(`${product.name} added to cart!`);
    } catch (err) {
      toast.error('Failed to add product to cart');
    }
  };

  const filteredProducts =
    selectedCategory === 'ALL'
      ? products
      : products.filter(
          (p) => p.category?.toUpperCase() === selectedCategory.toUpperCase()
        );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header Hero Section */}
        <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-zinc-900 to-black text-white p-8 sm:p-12 mb-12 shadow-2xl overflow-hidden border border-slate-800">
          <div className="absolute right-0 top-0 -mr-16 -mt-16 w-80 h-80 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/30 text-red-400 text-xs font-extrabold uppercase tracking-widest mb-4 border border-red-500/30">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              Hygraph Headless CMS Storefront
            </div>
            <h1 className="text-3xl sm:text-5xl font-black italic tracking-tight mb-4">
              HYGRAPH FOOTWEAR COLLECTION
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-medium">
              Seamlessly fetched in real-time via GraphQL from Hygraph Headless CMS using{' '}
              <code className="bg-slate-800 px-2 py-1 rounded text-red-400 font-mono text-xs">
                NEXT_PUBLIC_HYGRAPH_ENDPOINT
              </code>.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory('ALL')}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 ${
                  selectedCategory === 'ALL'
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30 scale-105'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                All Products ({products.length})
              </button>
              <button
                onClick={() => setSelectedCategory('FOOTWEAR')}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 ${
                  selectedCategory === 'FOOTWEAR'
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30 scale-105'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Footwear
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm animate-pulse flex flex-col justify-between h-96"
              >
                <div className="w-full h-48 bg-slate-200 rounded-2xl mb-4" />
                <div className="h-4 bg-slate-200 rounded w-1/3 mb-2" />
                <div className="h-6 bg-slate-200 rounded w-3/4 mb-3" />
                <div className="h-4 bg-slate-200 rounded w-full mb-4" />
                <div className="h-10 bg-slate-200 rounded-full w-full" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-3xl p-8 text-center max-w-xl mx-auto my-12 shadow-sm">
            <svg
              className="w-12 h-12 text-red-500 mx-auto mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h3 className="text-lg font-bold mb-1">Failed to Connect to Hygraph</h3>
            <p className="text-xs text-red-600 mb-6">{error}</p>
            <button
              onClick={fetchHygraphProducts}
              className="px-6 py-2.5 bg-red-600 text-white rounded-full font-bold text-xs hover:bg-red-700 shadow-md transition"
            >
              Retry GraphQL Fetch
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredProducts.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center max-w-lg mx-auto shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 mb-2">No Products Found</h3>
            <p className="text-sm text-slate-500 mb-6">
              No items returned from Hygraph CMS under category &quot;{selectedCategory}&quot;.
            </p>
            <button
              onClick={() => setSelectedCategory('ALL')}
              className="px-6 py-2.5 bg-slate-900 text-white rounded-full font-bold text-xs hover:bg-red-600 transition"
            >
              View All Products
            </button>
          </div>
        )}

        {/* Responsive Grid Layout (Tailwind CSS) */}
        {!loading && !error && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => {
              const imageUrl =
                product.image?.url ||
                'https://ap-south-1.graphassets.com/cmt191cu400ij01uv8dfjb4yn/cmt1nxhjx04dv06o33s0ghwx7';

              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-3xl p-5 border border-slate-100 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between relative overflow-hidden"
                >
                  {/* Tag Chip */}
                  {product.tag && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-600 text-white shadow-sm">
                        {product.tag}
                      </span>
                    </div>
                  )}

                  {/* Brand Tag */}
                  {product.brand && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-slate-900 text-white shadow-sm">
                        {product.brand}
                      </span>
                    </div>
                  )}

                  {/* Product Image Showcase */}
                  <div className="relative w-full h-56 bg-slate-50 rounded-2xl flex items-center justify-center p-4 mb-4 group-hover:bg-slate-100/80 transition-colors">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imageUrl}
                      alt={product.name}
                      className="object-contain max-h-44 drop-shadow-xl group-hover:scale-110 transition-transform duration-500 ease-out"
                      onError={(e) => {
                        e.currentTarget.src = '/images/4.png';
                      }}
                    />
                  </div>

                  {/* Product Body */}
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      {/* Category */}
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                        {product.category || 'FOOTWEAR'}
                      </span>

                      {/* Product Title */}
                      <h2 className="text-lg font-black text-slate-900 leading-tight mb-2 group-hover:text-red-600 transition-colors">
                        {product.name}
                      </h2>

                      {/* Description */}
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                        {product.description ||
                          'High-performance sneakers featuring premium cushioning and dynamic support.'}
                      </p>
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-2">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 block uppercase">Price</span>
                        <span className="text-xl font-black text-slate-900">
                          ${Number(product.price).toFixed(2)}
                        </span>
                      </div>

                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={isAdding}
                        className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-red-600 text-white rounded-full font-bold text-xs transition-all shadow-md active:scale-95 disabled:opacity-50"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                          />
                        </svg>
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
