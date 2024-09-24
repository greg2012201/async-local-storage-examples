import { FC } from "hono/jsx";
import cookies from "../cookies";

type GreetingProps = {
    name: string;
};

const Greeting: FC<GreetingProps> = ({ name }) => {
    const cookieStore = cookies();

    cookieStore.setCookie("test1", "test1");

    return (
        <div>
            <h1>Hello, {name}!</h1>
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

export default Greeting;
