import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export interface FilterState {
  category: string;
  sortBy: string;
  color: string;
  popularity: string;
}

interface FilterControlsProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  availableColors: string[];
}

const categories = ['All', 'Handbags', 'Purses', 'Accessories'];
const sortOptions = [
  { value: 'default', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];
const popularityOptions = [
  { value: 'all', label: 'All' },
  { value: 'best', label: 'Best Sellers' },
  { value: 'new', label: 'New Arrivals' },
];

export default function FilterControls({ filters, onChange, availableColors }: FilterControlsProps) {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      {/* Category */}
      <div className="flex gap-1.5 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => onChange({ ...filters, category: cat })}
            className={`px-4 py-1.5 font-sans text-[10px] tracking-luxury uppercase transition-all duration-200 ${
              filters.category === cat
                ? 'bg-noir text-ivory'
                : 'border border-noir/30 text-noir/60 hover:border-noir hover:text-noir'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Sort */}
      <Select
        value={filters.sortBy}
        onValueChange={val => onChange({ ...filters, sortBy: val })}
      >
        <SelectTrigger className="w-44 h-8 font-sans text-[10px] tracking-luxury uppercase border-noir/30 rounded-none">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map(opt => (
            <SelectItem key={opt.value} value={opt.value} className="font-sans text-xs">
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Color */}
      {availableColors.length > 0 && (
        <Select
          value={filters.color}
          onValueChange={val => onChange({ ...filters, color: val })}
        >
          <SelectTrigger className="w-36 h-8 font-sans text-[10px] tracking-luxury uppercase border-noir/30 rounded-none">
            <SelectValue placeholder="Color" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="font-sans text-xs">All Colors</SelectItem>
            {availableColors.map(color => (
              <SelectItem key={color} value={color} className="font-sans text-xs">{color}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {/* Popularity */}
      <div className="flex gap-1.5">
        {popularityOptions.map(opt => (
          <button
            key={opt.value}
            onClick={() => onChange({ ...filters, popularity: opt.value })}
            className={`px-4 py-1.5 font-sans text-[10px] tracking-luxury uppercase transition-all duration-200 ${
              filters.popularity === opt.value
                ? 'bg-gold text-ivory'
                : 'border border-gold/30 text-noir/60 hover:border-gold hover:text-gold'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
