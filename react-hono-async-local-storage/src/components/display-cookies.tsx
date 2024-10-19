import { FC } from "hono/jsx";
import cookies from "../cookies";

const DisplayCookies: FC = () => {
    const cookieStore = cookies();

    return (
        <div>
            <h1>Hello!</h1>
            <p>Here are your cookies:</p>
            <ul>
                {cookieStore.getCookies().map((cookie) => (
                    <li key={cookie.key}>
                        {cookie.key}: {cookie.value}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DisplayCookies;
