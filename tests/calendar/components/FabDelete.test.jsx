import { test, describe } from "vitest";

import { FabDelete } from "../../../src/calendar/components/FabDelete";
import { render ,screen} from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../src/store";

describe("test in <FabDelete>", () => {
  test("should be render the component ", () => {
    render(
      <Provider store={store}>
        <FabDelete />
      </Provider>
    );

    screen.debug();
  });
});
