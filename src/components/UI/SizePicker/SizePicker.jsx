import styles from "./SizePicker.module.scss";

const SizePicker = ({ pizzaSize, setPizzaSize }) => {
  const sizes = [
    { label: "30 см", value: "30" },
    { label: "40 см", value: "40" },
    { label: "50 см", value: "50" },
  ];

  return (
    <div className={styles.sizeButton}>
      {sizes.map((size) => (
        <button
          key={size.value}
          className={pizzaSize === size.value ? styles.activeSize : ""}
          onClick={() => setPizzaSize(size.value)}
        >
          {size.label}
        </button>
      ))}
    </div>
  );
};

export default SizePicker;
