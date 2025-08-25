import { Title } from "./title";
import { FilterCheckbox } from "./filter-checkbox";

interface Props {
    className?: string;
}

export const Filters = ({ className }: Props) => {
    return (
        <div className={className}>
            <Title text="Filter" size="sm" className="mb-5 font-bold" />
            
            <div className="flex flex-col gap-4">
                <FilterCheckbox text="Manual" value="1" />
                <FilterCheckbox text="New" value="2" />
            </div>
        </div>
    );
};