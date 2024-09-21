async function fetcher(endpoint: string) {
    console.log("fetching...", endpoint);

    await new Promise((resolve) => setTimeout(resolve, 200));
    // simulate fetching

    return [
        { id: 1, email: "user@example.com" },
        { id: 2, email: "work@example.com" },
        { id: 3, email: "personal@example.com" },
    ];
}

export default fetcher;
