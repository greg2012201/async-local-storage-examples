import type { FC } from "hono/jsx";

const App: FC = (props) => {
    return (
        <html>
            <body>{props.children}</body>
        </html>
    );
};

export default App;
