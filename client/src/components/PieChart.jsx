// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/pie
import { ResponsivePie } from "@nivo/pie";

import { data } from "../pieData";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsivePie = () => (
  <ResponsivePie
    data={data}
    margin={{ top: 4, right: 8, bottom: 8, left: 8 }}
    startAngle={-155}
    innerRadius={0.65}
    padAngle={4}
    activeOuterRadiusOffset={8}
    colors={{ scheme: "category10" }}
    borderWidth={10}
    borderColor={{
      from: "color",
      modifiers: [["darker", "0.2"]],
    }}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor="#333333"
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: "color" }}
    arcLabelsSkipAngle={16}
    arcLabelsTextColor={{
      from: "color",
      modifiers: [["darker", "1.5"]],
    }}
    defs={[
      {
        id: "dots",
        type: "patternDots",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.3)",
        size: 4,
        padding: 5,
        stagger: true,
      },
      {
        id: "lines",
        type: "patternLines",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.3)",
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
    ]}
    fill={[
      {
        match: {
          id: "ruby",
        },
        id: "dots",
      },
      {
        match: {
          id: "c",
        },
        id: "dots",
      },
      {
        match: {
          id: "go",
        },
        id: "dots",
      },
      {
        match: {
          id: "python",
        },
        id: "dots",
      },
      {
        match: {
          id: "scala",
        },
        id: "lines",
      },
      {
        match: {
          id: "lisp",
        },
        id: "lines",
      },
      {
        match: {
          id: "elixir",
        },
        id: "lines",
      },
      {
        match: {
          id: "javascript",
        },
        id: "lines",
      },
    ]}
    motionConfig="molasses"
    legends={[
      {
        anchor: "bottom",
        direction: "row",
        justify: false,
        translateX: 36,
        translateY: 59,
        itemsSpacing: 25,
        itemWidth: 77,
        itemHeight: 18,
        itemTextColor: "#999",
        itemDirection: "top-to-bottom",
        itemOpacity: 1,
        symbolSize: 11,
        symbolShape: "circle",
        effects: [
          {
            on: "hover",
            style: {
              itemTextColor: "#000",
            },
          },
        ],
      },
    ]}
  />
);

export default MyResponsivePie;
