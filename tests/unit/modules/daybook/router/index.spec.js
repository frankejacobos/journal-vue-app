import router from "@/modules/daybook/router";

describe("Pruebas en el router de daybook", () => {
  test("debe de existir", () => {
    expect(router).toBeTruthy();
  });
  test("el router debe tener la siguiente configuracion", () => {
    expect(router).toMatchObject({
      name: "day-book",
      component: expect.any(Function),
      children: [
        {
          path: "",
          name: "no-entry",
          component: expect.any(Function),
        },
        {
          path: ":id",
          name: "entry",
          component: expect.any(Function),
          props: expect.any(Function),
        },
      ],
    });
  });
  test("el router debe contener todos los componentes", async () => {
    let components = [];
    router.children.forEach((child) => {
      components.push(child.component());
    });
    const componentsNames = (await Promise.all(components)).map(
      (c) => c.default.name
    );
    expect(componentsNames).toContain("EntryView");
    expect(componentsNames).toContain("NoEntrySelected");
  });

  test("el componente entry debe retornar el id de la ruta", () => {
    const route = { params: { id: "ABC" } };
    const entryRoute = router.children.find((child) => child.name === "entry");
    expect(entryRoute.props(route)).toEqual({ id: "ABC" });
  });
});
