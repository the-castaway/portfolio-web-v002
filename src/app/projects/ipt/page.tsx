// `app/home.tsx` is the UI for the `/` URL
"use client"

export default function Page() {
    return (
        <>
            <div slot="column1">Content for Column 1</div>
            <div slot="column2">Content for Column 2</div>
            <div slot="column3">Content for Column 3</div>
        </>
    );
}
