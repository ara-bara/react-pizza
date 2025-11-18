import { useState } from "react";
import styles from "./MySelect.module.scss";

function MySelect({ value, onChange, defaultvalue, options, className }) {
  const [isOpen, setIsOpen] = useState(false);

  // ✔ Отримуємо name вибраної опції
  const selectedLabel =
    options.find((opt) => opt.value === value)?.name || defaultvalue;

  return (
    <div
      className={`${styles.customSelect} ${isOpen ? styles.open : ""} ${
        className || ""
      }`}
      onClick={() => setIsOpen(!isOpen)}
    >
      {/* ✔ Тут показуємо красиву назву */}
      <div className={styles.selected}>{selectedLabel}</div>

      {isOpen && (
        <div className={styles.options}>
          {options.map((option) => (
            <div
              key={option.value}
              className={styles.option}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MySelect;
