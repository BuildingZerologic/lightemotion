import { motion } from "framer-motion";

const LIGHT_OUTPUT_SWATCHES = {
    Red: "#e01818",
    Green: "#48b768",
    Blue: "#1c4ed8",
    "Ice Blue": "#6fd3e8",
    Pink: "#d527b8",
    Yellow: "#f5c400",
    "6500K": "#f8fbff",
    "6000K": "#f4f8ff",
    "4000K": "#fff3b2",
    "3000K": "#f4b33f",
    "2700K": "#f3a575",
};

const EMPTY_VALUES = new Set(["", null, undefined]);

function isEmptyValue(value) {
    if (EMPTY_VALUES.has(value)) {
        return true;
    }

    if (Array.isArray(value)) {
        return value.length === 0 || value.every(isEmptyValue);
    }

    if (typeof value === "object") {
        return Object.values(value).every(isEmptyValue);
    }

    return false;
}

function formatLabel(key) {
    if (key === "model") {
        return "Model";
    }

    if (key === "availableColors") {
        return "Light Outputs";
    }

    return key
        .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
        .replace(/[_-]+/g, " ")
        .replace(/\b\w/g, (character) => character.toUpperCase());
}

function formatObjectValue(value) {
    return Object.entries(value)
        .filter(([, itemValue]) => !isEmptyValue(itemValue))
        .map(([itemKey, itemValue]) => `${formatLabel(itemKey)}: ${formatValue(itemValue)}`)
        .join(", ");
}

function formatValue(value) {
    if (Array.isArray(value)) {
        return value.filter((item) => !isEmptyValue(item)).map(formatValue).join(", ");
    }

    if (typeof value === "object" && value !== null) {
        return formatObjectValue(value);
    }

    return value;
}

function getLightOutputColor(output) {
    if (LIGHT_OUTPUT_SWATCHES[output]) {
        return LIGHT_OUTPUT_SWATCHES[output];
    }

    if (/^#([0-9A-F]{3}){1,2}$/i.test(output) || /^rgb\(/i.test(output)) {
        return output;
    }

    return "var(--color-surface)";
}

function getVariantColumns(variants) {
    const keys = variants.reduce((columnKeys, variant) => {
        Object.keys(variant).forEach((key) => {
            if (key !== "model" && !columnKeys.includes(key)) {
                columnKeys.push(key);
            }
        });

        return columnKeys;
    }, []);

    return [
        "model",
        ...keys.filter((key) =>
            variants.some((variant) => !isEmptyValue(variant[key]))
        ),
    ];
}

function LightOutputs({ outputs }) {
    const visibleOutputs = outputs.filter((output) => !isEmptyValue(output));

    return (
        <ul className="product-detail__light-outputs" aria-label="Light outputs">
            {visibleOutputs.map((output) => (
                <li key={output}>
                    <span
                        className="product-detail__light-output-swatch"
                        style={{ "--swatch-color": getLightOutputColor(output) }}
                        aria-hidden="true"
                    />
                    <span>{output}</span>
                </li>
            ))}
        </ul>
    );
}

function ProductVariantCell({ column, value }) {
    if (isEmptyValue(value)) {
        return null;
    }

    if (column === "availableColors" && Array.isArray(value)) {
        return <LightOutputs outputs={value} />;
    }

    return formatValue(value);
}

export default function ProductVariantsTable({ tableId, variants = [] }) {
    const columns = getVariantColumns(variants);

    if (!variants.length) {
        return null;
    }

    return (
        <motion.section
            className="product-detail__variants-section"
            id={tableId}
            aria-labelledby="product-detail-variants-title"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="container-pdp product-detail__variants-container">
                <header className="product-detail__variants-header">
                    <p className="product-detail__section-kicker">
                        Specifications
                    </p>
                    <h2
                        className="product-detail__variants-title"
                        id="product-detail-variants-title"
                    >
                        Variant Matrix
                    </h2>
                </header>

                <div className="product-detail__table-wrap">
                    <table className="product-detail__variants-table">
                        <thead>
                            <tr>
                                {columns.map((column) => (
                                    <th key={column} scope="col">
                                        {formatLabel(column)}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {variants.map((variant, rowIndex) => (
                                <tr key={variant.model || rowIndex}>
                                    {columns.map((column) => {
                                        const content = (
                                            <ProductVariantCell
                                                column={column}
                                                value={variant[column]}
                                            />
                                        );

                                        if (column === "model") {
                                            return (
                                                <th key={column} scope="row">
                                                    {content}
                                                </th>
                                            );
                                        }

                                        return (
                                            <td key={column}>
                                                {content}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.section>
    );
}
