import { createMarkers } from "../Components/utils";

test("Checking the proper functioning of the marker creation function", () => {
  const date1 = new Date("June 27 2019 10:00");
  const date2 = new Date("June 27 2019 15:00");
  //   date2.setHours(date2.getHours() + 20);
  const markers = createMarkers(date1, date2);
  console.log(markers);
  expect(markers).not.toBeNull();
});
