import { useState, useEffect, forwardRef, type ChangeEvent } from 'react';
import { Col, Button, Form, Popover, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconName } from '@fortawesome/fontawesome-svg-core';
import yaml from 'js-yaml';
import iconsPath from '@fortawesome/fontawesome-free/metadata/icons.yml';

interface IconsYamlDoc {
  [key: string]: {
    styles: string[];
  };
}

const fetchIconsYamlDoc = (): Promise<IconsYamlDoc> => (
  fetch(iconsPath)
    .then((response) => response.text())
    .then((text) => yaml.load(text) as IconsYamlDoc)
);

const filterStyles = (yamlDoc: IconsYamlDoc): string[] => (
  Object.keys(yamlDoc).filter(
    (icon) => yamlDoc[icon].styles.includes('solid'),
  )
);

interface IconProps {
  name: string;
  onClick: (name: string) => void;
}

const Icon = ({ name, onClick }: IconProps) => (
  <Col className="mb-3">
    <Button onClick={() => onClick(name)}>
      <FontAwesomeIcon icon={name as IconName} fixedWidth />
    </Button>
  </Col>
);

interface IconListProps {
  icons: string[];
  onIconClick: (name: string) => void;
}

const IconList = ({ icons, onIconClick }: IconListProps) => (
  <Row className="g-0">
    {icons.map((icon) => <Icon key={icon} name={icon} onClick={onIconClick} />)}
  </Row>
);

interface PopoverTitleProps {
  onFilterChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const PopoverTitle = ({ onFilterChange }: PopoverTitleProps) => (
  <Popover.Header as="h3">
    <Form>
      <Form.Control type="text" placeholder="Type to filter" onChange={onFilterChange} />
    </Form>
  </Popover.Header>
);

const PopoverContent = ({ icons, onIconClick }: IconListProps) => (
  <Popover.Body>
    <IconList icons={icons} onIconClick={onIconClick} />
  </Popover.Body>
);

export interface IconPickerProps {
  onChange: (value: string) => void;
}

const IconPicker = forwardRef<HTMLDivElement, IconPickerProps>(
  function IconPicker({ onChange, ...props }, ref) {
    const [iconsYaml, setIconsYaml] = useState<string[]>([]);
    const [filteredIcons, setFilteredIcons] = useState<string[]>([]);
    const filterIcon = (value: string) => (
      setFilteredIcons(iconsYaml.filter((str) => str.includes(value)))
    );
    useEffect(() => {
      fetchIconsYamlDoc().then((yamlDoc) => {
        const icons = filterStyles(yamlDoc);
        setIconsYaml(icons);
        setFilteredIcons(icons);
      });
    }, []);
    return (
      <Popover ref={ref} {...props}>
        <PopoverTitle onFilterChange={(e) => filterIcon(e.target.value)} />
        <PopoverContent icons={filteredIcons} onIconClick={onChange} />
      </Popover>
    );
  }
);

export default IconPicker;
