import type { FC } from "hono/jsx";

const App: FC = ({ children }) => {
    return (
        <html>
            <body>{children}</body>
        </html>
    );
};

export default App;
