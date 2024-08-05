import { factory } from "./factory";

let count = factory(0, 1);
let factoryReset = true;

function update_count_and_reset_counter() {
  count = factory(0, 0);
  factoryReset = true;
  update_text_content();
}

const start_at_control = document.getElementById(
  "start_at",
) as HTMLInputElement;

const step_control = document.getElementById("step") as HTMLInputElement;

start_at_control?.addEventListener("change", () =>
  update_count_and_reset_counter(),
);

step_control?.addEventListener("change", () =>
  update_count_and_reset_counter(),
);

const count_button = document.querySelector(
  ".count_button",
) as HTMLButtonElement;
const current_count = document.querySelector(
  ".current_count",
) as HTMLSpanElement;

function update_count() {
  if (factoryReset) {
    count = factory(Number(start_at_control.value), Number(step_control.value));
    factoryReset = false;
  }

  update_text_content();
}

count_button.addEventListener("click", update_count);

function update_text_content() {
  const value = count();
  update_button_colour(value);
  current_count.textContent = value.toString();
}

function update_button_colour(value: number) {
  if (value > 0) {
    count_button.classList.add("positive");
  } else if (value < 0) {
    count_button.classList.add("negative");
  } else {
    count_button.classList.remove("positive");
    count_button.classList.remove("negative");
  }
}
