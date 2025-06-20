import { routing } from "@/i18n/routing";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { notFound } from "next/navigation";
import { roundhand, inter } from "../fonts";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/shared/config/theme";
import { CookiesBanner } from "@/widgets/cookiesBanner/cookiesBanner";
import { Footer } from "@/widgets/footer/footer";
import { Toaster } from "react-hot-toast";
import "@/app/datePicker.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";


export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await auth();
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} className={`${roundhand.variable} ${inter.variable}`}>
      <head>
        <link rel="stylesheet" href="/theme.css" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body className="relative">
        <NextIntlClientProvider key={locale} locale={locale}>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <SessionProvider session={session}>{children}</SessionProvider>
              <CookiesBanner />
              <Toaster position="top-center" />
              <Footer />
            </ThemeProvider>
          </AppRouterCacheProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
