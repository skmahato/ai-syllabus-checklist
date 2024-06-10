import React, { useState, useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import { syllabus } from "./checklist.constants";

const Checklist = () => {
  const [checkedItems, setCheckedItems] = useState(new Set());

  useEffect(() => {
    const storedCheckedItems = localStorage.getItem("checkedItems");
    if (storedCheckedItems) {
      setCheckedItems(new Set(JSON.parse(storedCheckedItems)));
    }
  }, []);

  const handleCheck = (item) => {
    const updatedCheckedItems = new Set(checkedItems);
    if (updatedCheckedItems.has(item)) {
      updatedCheckedItems.delete(item);
    } else {
      updatedCheckedItems.add(item);
    }
    localStorage.setItem(
      "checkedItems",
      JSON.stringify(Array.from(updatedCheckedItems))
    );
    setCheckedItems(updatedCheckedItems);
  };

  return (
    <Container>
      <h1 className="mt-4 mb-4">AI Syllabus Checklist</h1>
      {syllabus.map((section) => (
        <div key={section.category} className="mb-4">
          <h2 className="h4">{section.category}</h2>
          <ul className="list-group">
            {section.items.map((item) => (
              <li key={item} className="list-group-item">
                <Form.Check
                  type="checkbox"
                  label={item}
                  checked={checkedItems.has(item)}
                  onChange={() => handleCheck(item)}
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </Container>
  );
};

export default Checklist;
