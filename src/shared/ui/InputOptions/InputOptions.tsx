import { Button } from '../Button/Button';

type Props = {
  options: string[];
  selected?: string;
  onSelect?: (value: string) => void;
};

export const InputOptions = ({ options, selected, onSelect }: Props) => {
  return (
    <div className='flex w-full flex-col gap-1'>
      <input
        type='hidden'
        value={selected}
      />
      <div className='flex flex-wrap gap-2'>
        {options.map((option) => (
          <Button
            key={option}
            text={option}
            ariaLabel={option}
            colorStyle={selected === option ? 'primary' : 'secondary'}
            onClick={() => onSelect?.(option)}
          />
        ))}
      </div>
    </div>
  );
};
