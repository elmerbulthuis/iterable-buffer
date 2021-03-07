import delay from "delay";
import * as test from "tape-promise/tape";
import { createBuffered } from "./buffered";

test("buffered", async t => {

    const buffered = createBuffered(gen());
    await delay(2000);
    for await (const i of buffered) {
        t.comment(i);
    }

    async function* gen() {
        yield "1";
        await delay(1000);
        yield "2";
        await delay(1000);
        yield "3";
        await delay(1000);
    }
});
