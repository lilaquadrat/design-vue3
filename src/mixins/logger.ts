interface LoggerFunction {
    (message: string, color?: string): void;
}

interface Logger {
    [key: string]: LoggerFunction;
}

// Predefined colors for categories, if needed
const categoryColors: { [key: string]: string } = {
  plugins: 'background-color: #3f2d56; color: #FFF',
  startup: 'background-color: #5A8C99; color: #FFF',
  auth   : 'background-color: #5A8C99; color: #FFF',
  // Add other predefined categories and colors as needed
};
const logger = new Proxy<Logger>({}, {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  get: function (target, propKey, receiver) {
    // Method to log messages with dynamic category-based styling and optional color for the category
    const log = (category: string, message: string, color?: string): void => {
      const categoryStyle = color ? `color: ${color}` : categoryColors[category.toLowerCase()] || 'color: #FFF';

      // Log the category with style and message without style

      console.log(`%c[FRONTEND]%c%c[${category.toUpperCase()}]%c ${message}`, 'background-color: #3f2d56;', 'padding: 5px', categoryStyle, 'color: inherit');
    };

    return (message: string, color?: string) => log(propKey.toString(), message, color);
  }
});

export default logger;