import React, { useState, useEffect } from 'react';
import {
  Col, Button, Form, Popover, Row,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import yaml from 'js-yaml';
import iconsPath from '@fortawesome/fontawesome-free/metadata/icons.yml';

const fetchIconsYamlDoc = () => (
  fetch(iconsPath)
    .then((response) => response.text())
    .then((text) => yaml.load(text))
);

const filterStyles = (yamlDoc) => (
  Object.keys(yamlDoc).filter(
    (icon) => yamlDoc[icon].styles.includes('solid'),
  )
);

const Icon = ({ name, onClick }) => (
  <Col className="mb-3">
    <Button onClick={() => onClick(name)}>
      <FontAwesomeIcon icon={name} fixedWidth />
    </Button>
  </Col>
);
Icon.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const IconList = ({ icons, onIconClick }) => (
  <Row className="g-0">
    {icons.map((icon) => <Icon key={icon} name={icon} onClick={onIconClick} />)}
  </Row>
);
IconList.propTypes = {
  icons: PropTypes.arrayOf(PropTypes.string).isRequired,
  onIconClick: PropTypes.func.isRequired,
};

const PopoverTitle = ({ onChange }) => (
  <Popover.Header as="h3">
    <Form>
      <Form.Control type="text" placeholder="Type to filter" onChange={onChange} />
    </Form>
  </Popover.Header>
);
PopoverTitle.propTypes = {
  onChange: PropTypes.func.isRequired,
};

const PopoverContent = ({ icons, onIconClick }) => (
  <Popover.Body>
    <IconList icons={icons} onIconClick={onIconClick} />
  </Popover.Body>
);
PopoverContent.propTypes = IconList.propTypes;

/**
 * Note custom `Popover` require props (and refs) to be passed
 * https://github.com/react-bootstrap/react-bootstrap/issues/1345
 */
const IconPicker = React.forwardRef(({ onChange, ...props }, ref) => {
  const [iconsYaml, setIconsYaml] = useState([]);
  const [filteredIcons, setFilteredIcons] = useState([]);
  const filterIcon = (value) => (
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
    /* eslint-disable react/jsx-props-no-spreading */
    <Popover ref={ref} {...props}>
      <PopoverTitle onChange={(e) => filterIcon(e.target.value)} />
      <PopoverContent icons={filteredIcons} onIconClick={onChange} />
    </Popover>
  );
});
IconPicker.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default IconPicker;
