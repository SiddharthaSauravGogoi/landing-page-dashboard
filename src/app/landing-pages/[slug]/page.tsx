import dynamic from "next/dynamic";

const ActionBar = dynamic(() => import("@/components/action-bar"), {
  ssr: false,
});
const GenericComponent = dynamic(
  () => import("@/components/generic-component"),
  { ssr: false }
);
const CustomComponents = dynamic(
  () => import("@/components/custom-components"),
  { ssr: false }
);

export default function Page({ params }: { params: { slug: string } }) {
  // @todo move everything to placement array
  return (
    <div className="flex min-h-screen flex-col p-4 min-w-screen">
      <ActionBar title={params.slug} />
      <GenericComponent title={params.slug} component="header" />
      <GenericComponent title={params.slug} component="textBlock" />
      <GenericComponent title={params.slug} component="image" />
      <CustomComponents title={params.slug} />
      <GenericComponent title={params.slug} component="footer" />
    </div>
  );
}
