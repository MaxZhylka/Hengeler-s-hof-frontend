import Header from "@/widgets/header/ui/header";
import BurgerHeader from "@/widgets/header/ui/burgerHeader";
import { loadContacts } from "@/entities/api/contact.service";


export default async function ImageHeaderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const contacts = await loadContacts();

  return (
    <>
      <Header hasImage={true} />
      <BurgerHeader contacts={contacts} hasImage={true} />
      {children}
    </>
  );
}
