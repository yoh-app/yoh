import { useState, useRef, useEffect } from 'react';
import cn from 'classnames';
// material
import { styled } from '@mui/material/styles';

const MultipleSwitchStyle = styled('div')(({ theme }) => ({
  display: 'inline-flex',
  position: 'relative',
  background: '#F8F8F8',
  borderRadius: '16px',
  color: '#4B5971',
  fontSize: '14px',
  lineHeight: '24px',
}));

const MultipleSwitchButtonStyle = styled('button')(({ theme }) => ({
  transition: 'color 0.3s ease 0s',
  padding: ' 4px 12px',
  position: 'relative',
  color: '#4B5971',
  '&.button-active': {
    color: '#FFFFFF'
  }
}));

const MultipleSwitchPadStyle = styled('div')(({ theme }) => ({
  transition: 'left 0.3s ease 0s',
  position: 'absolute',
  left: 0,
  top: 0,
  height: '100%',
  background: '#6851FF',
  zIndex: 0,
  borderRadius: '16px',
}));

const useActiveState = (defaultSate = '') => {
  const [value, setState] = useState(defaultSate);
  return {
    value,
    onChange: (state: any) => {
      setState(state);
    },
  };
};
const usePadState = (defaultSate = { width: 0, height: 0, top: 0, left: 0 }) => {
  const [value, setState] = useState(defaultSate);
  return {
    value,
    onMove: (state: any) => {
      setState(state);
    },
  };
};

interface Props {
  options?: any[];
  activeId?: string;
  onClickButton?: Function
}

export default function MultipleSwitch({
  options,
  activeId = '',
  onClickButton
}: Props) {
  const activeState = useActiveState(activeId);
  const padState = usePadState();
  const refTabs: Record<string, React.RefObject<HTMLButtonElement>> = {};
  options.forEach((entry) => {
    refTabs[entry.id] = useRef<HTMLButtonElement>(null);
  });

  const _clickButton = (tab) => {
    activeState.onChange(tab.id);
    if (onClickButton) {
      onClickButton(tab);
    }
  };

  const _movePad = (target) => {
    const targetRef = refTabs[target];
    if (targetRef?.current) {
      const targetCurrent = targetRef.current;
      if (targetCurrent) {
        padState.onMove({
          width: targetCurrent.offsetWidth || 0,
          height: targetCurrent.offsetHeight || 0,
          top: targetCurrent.offsetTop || 0,
          left: targetCurrent.offsetLeft || 0,
        });
      }
    }
  };


  useEffect(() => {
    if (activeId) {
      _movePad(activeId);
    } else {
      activeState.onChange(options[0].id)
      _movePad(options[0].id);
    };
  }, []);
  useEffect(() => {
    _movePad(activeState.value);
  }, [activeState.value]);
  return (
    <MultipleSwitchStyle>
      <MultipleSwitchPadStyle style={{ ...padState.value }} />
      {
        options.map((option) => {
          return (
            <MultipleSwitchButtonStyle
              ref={refTabs[option.id]}
              className={cn({ "button-active": (activeId || activeState.value) === option.id })}
              key={option.id}
              onClick={() => {
                _clickButton(option);
              }}
            >
              {option.title}
            </MultipleSwitchButtonStyle>
          );
        })
      }
    </MultipleSwitchStyle>
  )
}