// src/styles/common.js
// Theme: Modern Minimalist — white/gray-50 background, #1d1d1f text, #6366f1 accent (Indigo)
// Focus on clean typography, ample whitespace, and subtle borders.

// ─── Layout ───────────────────────────────────────────
export const pageBackground = "bg-gray-50 min-h-screen";
export const pageWrapper = "max-w-5xl mx-auto px-6 py-16";
export const section = "mb-14";

// ─── Cards ────────────────────────────────────────────
export const cardClass =
  "bg-white border border-gray-100 rounded-2xl p-7 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer";

// ─── Typography ───────────────────────────────────────
export const pageTitleClass = "text-5xl font-extrabold text-[#1d1d1f] tracking-tight leading-none mb-4";
export const headingClass = "text-2xl font-bold text-[#1d1d1f] tracking-tight";
export const subHeadingClass = "text-lg font-semibold text-[#1d1d1f] tracking-tight";
export const bodyText = "text-gray-600 leading-relaxed";
export const mutedText = "text-sm text-gray-400";
export const linkClass = "text-indigo-600 hover:text-indigo-700 transition-colors";

// ─── Buttons ──────────────────────────────────────────
export const primaryBtn =
  "bg-black text-white font-semibold px-6 py-2.5 rounded-full hover:bg-gray-800 transition-all cursor-pointer text-sm tracking-tight active:scale-95";
export const secondaryBtn =
  "border border-gray-200 text-gray-800 font-medium px-6 py-2.5 rounded-full hover:bg-gray-50 transition-all cursor-pointer text-sm active:scale-95";
export const ghostBtn = "text-indigo-600 font-medium hover:text-indigo-700 transition-colors cursor-pointer text-sm";

// ─── Forms ────────────────────────────────────────────
export const formCard = "bg-white border border-gray-100 rounded-2xl p-8 md:p-12 shadow-sm max-w-2xl mx-auto";
export const formTitle = "text-3xl font-bold text-[#1d1d1f] tracking-tight text-center mb-8";
export const labelClass = "text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block";
export const inputClass =
  "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all";
export const formGroup = "mb-6";
export const submitBtn =
  "w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl hover:bg-indigo-700 transition-all cursor-pointer mt-4 text-sm tracking-wide shadow-lg shadow-indigo-500/20 active:scale-[0.98]";

// ─── Navbar ───────────────────────────────────────────
export const navbarClass =
  "bg-white/80 backdrop-blur-md border-b border-gray-100 px-8 h-16 flex items-center sticky top-0 z-50";
export const navContainerClass = "max-w-7xl mx-auto w-full flex items-center justify-between";
export const navBrandClass = "text-xl font-black text-black tracking-tighter";
export const navLinksClass = "flex items-center gap-8";
export const navLinkClass = "text-sm text-gray-500 hover:text-black transition-colors font-medium";
export const navLinkActiveClass = "text-sm text-black font-bold";

// ─── Article / Blog ───────────────────────────────────
export const articleGrid = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8";
export const articleCardClass =
  "group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500 flex flex-col cursor-pointer";
export const articleTitle = "text-xl font-bold text-gray-900 leading-tight group-hover:text-indigo-600 transition-colors";
export const articleExcerpt = "text-sm text-gray-500 leading-relaxed line-clamp-3";
export const articleMeta = "text-xs font-medium text-gray-400";
export const articleBody = "text-gray-600 leading-[1.8] text-base max-w-2xl";
export const timestampClass = "text-xs text-gray-400 flex items-center gap-1.5";
export const tagClass = "text-[10px] font-bold text-indigo-600 uppercase tracking-widest px-2 py-1 bg-indigo-50 rounded-md w-fit";

// ─── Article Page ─────────────────────────────────────
export const articlePageWrapper = "max-w-3xl mx-auto px-6 py-20";
export const articleHeader = "mb-12 flex flex-col gap-6 text-center";
export const articleCategory = "text-xs font-bold uppercase tracking-widest text-indigo-600 mb-2";
export const articleMainTitle = "text-4xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight";
export const articleAuthorRow =
  "flex items-center justify-center gap-6 border-y border-gray-100 py-6 text-sm text-gray-500 mb-10";
export const authorInfo = "flex items-center gap-3 font-bold text-gray-900";
export const articleContent = "text-gray-800 leading-[2] text-lg whitespace-pre-line";
export const articleFooter = "border-t border-gray-100 mt-16 pt-10 text-sm text-gray-400";

// ─── Article Actions ─────────────────────────────
export const articleActions = "flex gap-4 mt-8";
export const editBtn = "bg-indigo-600 text-white text-sm font-bold px-6 py-2 rounded-full hover:bg-indigo-700 transition shadow-md shadow-indigo-500/10";
export const deleteBtn = "bg-red-50 text-red-600 text-sm font-bold px-6 py-2 rounded-full hover:bg-red-100 transition";

// ─── Article Status Badge ─────────────────────────
export const articleStatusActive =
  "text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 uppercase tracking-wider";
export const articleStatusDeleted =
  "text-[10px] font-bold px-2.5 py-1 rounded-full bg-rose-50 text-rose-600 uppercase tracking-wider";

// ─── Feedback ─────────────────────────────────────────
export const errorClass =
  "bg-rose-50 text-rose-600 border border-rose-100 rounded-xl px-4 py-4 text-sm font-medium flex items-center gap-3";
export const successClass =
  "bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl px-4 py-4 text-sm font-medium flex items-center gap-3";
export const loadingClass = "flex flex-col items-center justify-center py-20 gap-4";
export const emptyStateClass = "flex flex-col items-center justify-center py-24 text-gray-400 gap-4";

// ─── Divider ──────────────────────────────────────────
export const divider = "border-t border-gray-100 my-12";
