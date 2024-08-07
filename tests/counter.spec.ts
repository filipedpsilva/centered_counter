import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const FIRST_TEST_VALUES = ["3000", "-500", "2500"] as const,
  SECOND_TEST_VALUES = ["-30000", "4500", "-25500"] as const;

test.beforeEach(async ({ page }) => {
  await page.goto("https://filipedpsilva.github.io/demo/counter/");
});

test.describe("A Simple visual test", () => {
  test("page has title", async ({ page }) => {
    await expect(page).toHaveTitle(/Filipe Silva | Centered counter/);
  });

  test('page should have an input label with "Start at"', async ({ page }) => {
    await expect(page.getByLabel("Start at")).toBeVisible();
  });

  test('make sure "Start at" has a "0" starting value', async ({ page }) => {
    await expect(page.getByLabel("Start at")).toHaveValue("0");
  });

  test('page should have an input label with "Step"', async ({ page }) => {
    await expect(page.getByLabel("Step")).toBeVisible();
  });

  test('make sure "Step" has a "1" starting value', async ({ page }) => {
    await expect(page.getByLabel("Step")).toHaveValue("1");
  });

  test('page should have a button with "0" on it', async ({ page }) => {
    await expect(page.getByRole("button", { name: "0" })).toBeVisible();
  });
});

test.describe("Input, result and visual tests", () => {
  // RegEx
  const POSITIVE_CLASS_REGEX = /positive/,
    NEGATIVE_CLASS_REGEX = /negative/;

  // RGB colours
  const GREENYELLOW_COLOR = "rgb(173, 255, 47)",
    RED_COLOR = "rgb(255, 0, 0)";

  // Misc
  const BACKGROUND_COLOR_RULE = "background-color";

  test('the user should be able to fill both inputs and get a "2500" result when clicking the button', async ({
    page,
  }) => {
    await fillFirstTestValues(page);
  });

  test('after getting a "2500" result when clicking the button, the button should be "positive"', async ({
    page,
  }) => {
    await fillFirstTestValues(page);

    await expect(page.getByRole("button")).toHaveClass(POSITIVE_CLASS_REGEX);
  });

  test('after checking a "positive" result, the button should be the color "greenyellow"', async ({
    page,
  }) => {
    await fillFirstTestValues(page);

    await expect(page.getByRole("button")).toHaveCSS(BACKGROUND_COLOR_RULE, GREENYELLOW_COLOR);
  });

  test('the user should be able to fill both inputs and get a "-25500" result when pressing "Enter"', async ({
    page,
  }) => {
    await fillSecondTestValues(page);
  });

  test('after getting a "-25500" result when clicking the button, the button should be "negative"', async ({
    page,
  }) => {
    await fillSecondTestValues(page);

    await expect(page.getByRole("button")).toHaveClass(NEGATIVE_CLASS_REGEX);
  });

  test('after checking a "negative" result, the button should be the color "red"', async ({
    page,
  }) => {
    await fillSecondTestValues(page);

    await expect(page.getByRole("button")).toHaveCSS(BACKGROUND_COLOR_RULE, RED_COLOR);
  });

  test('the user should "Start at" with "10" and "Step" with "10" and NOT get "40" as result when clicking 2 times', async ({
    page,
  }) => {
    await page.getByLabel("Start at").fill("10");
    await page.getByLabel("Step").fill("10");
    await page.getByRole("button").click();
    await page.getByRole("button").click();
    await expect(page.getByRole("button", { name: "40" })).not.toBeVisible();
  });
});

test.describe("Persistence", () => {
  test("page should not persist its data", async ({ page }) => {
    await fillFirstTestValues(page);

    await page.reload();

    await expect(page.getByLabel("Start at")).toBeVisible();
    await expect(page.getByLabel("Start at")).toHaveValue("0");
    await expect(page.getByLabel("Step")).toBeVisible();
    await expect(page.getByLabel("Step")).toHaveValue("1");
    await expect(page.getByRole("button", { name: "0" })).toBeVisible();
  });
});

test.describe("Accessibility Tests", () => {
  test("'Start at' label should not have any automatically detectable accessibility issues", async ({
    page,
  }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .include("#start_at_label")
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("'Start at' input should not have any automatically detectable accessibility issues", async ({
    page,
  }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).include("#start_at").analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("'Step' label should not have any automatically detectable accessibility issues", async ({
    page,
  }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .include("#step_label")
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("'Step' input should not have any automatically detectable accessibility issues", async ({
    page,
  }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).include("#step").analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("counter button should not have any automatically detectable accessibility issues", async ({
    page,
  }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .include(".count_button")
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

test.describe("Tests that are failing", () => {
  test.fail("page has automatically detectable accessibility issues", async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

//#region Aux

async function fillFirstTestValues(page: Page) {
  await page.getByLabel("Start at").fill(FIRST_TEST_VALUES[0]);
  await page.getByLabel("Step").fill(FIRST_TEST_VALUES[1]);
  await page.getByRole("button", { name: "0" }).click();
  await expect(page.getByRole("button", { name: FIRST_TEST_VALUES[2] })).toBeVisible();
}

async function fillSecondTestValues(page: Page) {
  await page.getByLabel("Start at").fill(SECOND_TEST_VALUES[0]);
  await page.getByLabel("Step").fill(SECOND_TEST_VALUES[1]);
  await page.getByRole("button", { name: "0" }).press("Enter");
  await expect(page.getByRole("button", { name: SECOND_TEST_VALUES[2] })).toBeVisible();
}

//#endregion Aux
