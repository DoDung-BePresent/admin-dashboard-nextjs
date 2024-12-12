import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ConfigProvider } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { colors } from "@/constants/colors";

const roboto = Roboto({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
  style: ["italic", "normal"],
});

export const metadata: Metadata = {
  title: "Admin shopping E-commerce",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <ConfigProvider
          theme={{
            token: {
              fontFamily: roboto.style.fontFamily,
            },
            components: {
              Input: {
                activeBorderColor: colors.primary500,
                hoverBorderColor: colors.primary500,
                activeShadow: colors.activeShadow,
                colorBorder: colors.primary500,
              },
              Select: {
                activeBorderColor: colors.primary500,
                hoverBorderColor: colors.primary500,
                colorBorder: colors.primary500,
                activeOutlineColor: colors.activeSelectShadow,
                optionSelectedBg: colors.primary50,
                colorPrimary: colors.primary500,
              },
              InputNumber: {
                activeBorderColor: colors.primary500,
                hoverBorderColor: colors.primary500,
                activeShadow: colors.activeShadow,
                colorBorder: colors.primary500,
                handleHoverColor: colors.primary500,
              },
              Button: {
                defaultBorderColor: colors.primary20,
                defaultHoverBorderColor: colors.primary20,
                defaultHoverColor: colors.black,
                defaultHoverBg: colors.primary5,
                defaultActiveBorderColor: colors.primary500,
                defaultActiveColor: colors.primary500,
              },
              Upload: {
                colorPrimaryHover: colors.primary500,
                colorPrimary: colors.primary500,
                colorPrimaryBorder: colors.primary500,
              },
              Form: {
                itemMarginBottom: 22,
              },
              Checkbox: {
                colorPrimaryHover: colors.primary500,
                colorPrimary: colors.primary500,
                colorBorder: colors.primary500,
              },
              Slider: {
                trackBg: colors.primary500,
                trackHoverBg: colors.primary500,
                handleActiveColor: colors.primary500,
                handleActiveOutlineColor: colors.primary500,
                handleColor: colors.primary500,
                dotActiveBorderColor: colors.primary500,
                colorPrimaryBorderHover: colors.primary500,
              },
              Rate: {
                marginXS: 3,
              },
              Tabs: {
                fontSize: 17,
                inkBarColor: colors.primary500,
                itemActiveColor: colors.primary500,
                itemSelectedColor: colors.primary500,
                itemHoverColor: colors.primary300,
              },
              Breadcrumb: {
                fontSize: 16,
              },
            },
          }}
        >
          <AntdRegistry>{children}</AntdRegistry>
        </ConfigProvider>
      </body>
    </html>
  );
}
