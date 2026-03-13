import { ChevronRight } from 'lucide-react';
import { NewsPost } from '../../types';

interface BlogSectionProps {
    newsPosts: NewsPost[];
    onNavigate: (page: string) => void;
    onOpenPost: (post: NewsPost) => void;
}

const BlogSection = ({ newsPosts, onNavigate, onOpenPost }: BlogSectionProps) => (
    <section className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div className="trapezoid-title">HỖ TRỢ KHÁCH HÀNG</div>
                <button
                    onClick={() => onNavigate('news')}
                    className="text-brand-blue font-bold text-sm hover:underline flex items-center gap-1"
                >
                    Xem tất cả bài viết <ChevronRight className="w-4 h-4" />
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {newsPosts.slice(0, 4).map((post) => (
                    <div
                        key={post.id}
                        onClick={() => onOpenPost(post)}
                        className="border border-zinc-100 rounded-none overflow-hidden hover:shadow-lg transition-all group cursor-pointer"
                        data-no-edit="true"
                    >
                        <div className="bg-zinc-100 h-36 flex items-center justify-center relative overflow-hidden">
                            <img
                                data-no-edit-img="true"
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-3 left-3 bg-brand-red text-white rounded-none text-center px-3 py-1 min-w-[48px]">
                                <div className="text-xl font-black leading-tight">{post.date.split('/')[0]}</div>
                                <div className="text-[10px] font-bold uppercase">Th{post.date.split('/')[1]}</div>
                            </div>
                        </div>
                        <div className="p-4" data-no-edit>
                            <h4 className="font-bold text-sm text-zinc-800 leading-snug mb-2 group-hover:text-brand-blue transition-colors line-clamp-2">{post.title}</h4>
                            <p className="text-zinc-400 text-xs leading-relaxed mb-3 line-clamp-2">{post.excerpt}</p>
                            <span className="text-brand-blue text-xs font-bold flex items-center gap-1">
                                Xem chi tiết <ChevronRight className="w-3 h-3" />
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default BlogSection;
