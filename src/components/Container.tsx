import { useEffect, useState } from 'react';
import { Col, Container as ReactContainer, Row } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import ConfigureIcon from './ConfigureIcon';
import IconPreview from './IconPreview';
import type { IconProperties } from '../types';

const DEFAULT_ICON_PROPERTIES: IconProperties = {
  icon: 'paw',
  color: '#333333',
  size: 100,
};

const sanitizeIcon = (value: string | null): string => (
  value && value.trim() ? value : DEFAULT_ICON_PROPERTIES.icon
);

const sanitizeColor = (value: string | null): string => (
  value && /^#[0-9a-fA-F]{6}$/.test(value) ? value : DEFAULT_ICON_PROPERTIES.color
);

const sanitizeSize = (value: string | null): number => {
  const parsed = Number(value);
  if (Number.isInteger(parsed) && parsed >= 1 && parsed <= 500) {
    return parsed;
  }
  return DEFAULT_ICON_PROPERTIES.size;
};

const fromSearchParams = (searchParams: URLSearchParams): IconProperties => ({
  icon: sanitizeIcon(searchParams.get('icon')),
  color: sanitizeColor(searchParams.get('color')),
  size: sanitizeSize(searchParams.get('size')),
});

const toSearchParams = ({ icon, color, size }: IconProperties): URLSearchParams => {
  const searchParams = new URLSearchParams();
  searchParams.set('icon', sanitizeIcon(icon));
  searchParams.set('color', sanitizeColor(color));
  searchParams.set('size', sanitizeSize(size.toString()).toString());
  return searchParams;
};

const Container = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [iconProperties, setIconProperties] = useState<IconProperties>(() => fromSearchParams(searchParams));

  useEffect(() => {
    const nextSearchParams = toSearchParams(iconProperties);
    if (nextSearchParams.toString() !== searchParams.toString()) {
      setSearchParams(nextSearchParams, { replace: true });
    }
  }, [iconProperties, searchParams, setSearchParams]);

  const onChange = <K extends keyof IconProperties>(property: K) => (value: IconProperties[K]) => (
    setIconProperties((previous) => ({ ...previous, [property]: value }))
  );

  return (
    <ReactContainer>
      <Row>
        <Col md={5} lg={4}>
          <ConfigureIcon
            onIconChange={onChange('icon')}
            iconValue={iconProperties.icon}
            onColorChange={onChange('color')}
            colorValue={iconProperties.color}
            onSizeChange={onChange('size')}
            sizeValue={iconProperties.size}
          />
        </Col>
        <Col md={7} lg={8}>
          <IconPreview
            icon={iconProperties.icon}
            color={iconProperties.color}
            size={iconProperties.size}
          />
        </Col>
      </Row>
    </ReactContainer>
  );
};

export default Container;
