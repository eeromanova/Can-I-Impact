import { Button } from '../Button/Button';
import { Option } from '@/shared/model/types';
type Props = {
  options: Option[];
  selectedId: string | null;
  onSelect?: (value: string) => void;
};

export const InputOptions = ({ options, selectedId, onSelect }: Props) => {
  return (
    <div
      role='list'
      className='flex w-full flex-col gap-1'
    >
      <div className='flex flex-wrap gap-2'>
        {options.map((option) => (
          <Button
            key={option.id}
            text={option.value}
            ariaLabel={option.value}
            colorStyle={selectedId === option.id ? 'primary' : 'secondary'}
            onClick={() => onSelect?.(option.id)}
          />
        ))}
      </div>
    </div>
  );
};
