import React, {FC, useEffect, useState} from 'react';
import styled from "styled-components";

const Wrapper = styled.div<{
  $active: boolean,
  $isPlaceholder: boolean
}>`
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    font-size: var(--font-size-sm);
    border: 1px solid var(--color-text-primary);
    padding: 8px 15px;
    cursor: pointer;
    border-radius: 5px;
    color: ${props => props.$isPlaceholder ? "var(--color-text-secondary)" : "var(--color-test.primary)"};
`

const ChooseMenu = styled.div`
    position: absolute;
    top: calc(100% + 5px);
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: var(--color-white);
    border: 1px solid var(--color-text-primary);
    border-radius: 5px;
    z-index: 1;
`

const ChooseMenuOption = styled.div`
    padding: 8px 15px;
    
    &:hover {
        background-color: var(--color-red);
        color: var(--color-white);
    }
    
    
`

interface SelectOption {
  value: any;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  onChange: (option: SelectOption) => void;
  placeholder?: string;
  value?: SelectOption | null;
}

const CustomSelect: FC<SelectProps> = ({options, onChange, placeholder = "Выберите что-то", value = null}) => {
  const [chosenValue, setChosenValue] = useState<SelectOption | null>(value);
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    setChosenValue(value);
  })

  return (
    <Wrapper
      onClick={e => setActive(!active)}
      $active={active}
      $isPlaceholder={chosenValue === undefined}
    >
      {chosenValue ? chosenValue.label : placeholder}
      {active && <ChooseMenu>
        {options.map(option =>
          <ChooseMenuOption
            key={option.value}
            onClick={() => {
              onChange(option);
              setActive(false);
            }}
          >
            {option.label}
          </ChooseMenuOption>
        )}
      </ChooseMenu>}
    </Wrapper>
  );
};

export default CustomSelect;