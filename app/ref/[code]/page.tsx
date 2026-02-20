import { supabase } from "@/app/supabase";
import { redirect } from "next/navigation";

export default async function RedirectPage({ params }: { params: { code: string } }) {
  const { code } = await params;

  // 1. Fetch the original URL AND the current click count
  const { data, error } = await supabase
    .from("links")
    .select("original_url, click_count")
    .eq("short_code", code)
    .single();

  if (data?.original_url) {
    // 2. THE TRACKER: Increment the click count by 1 in the database
    await supabase
      .from("links")
      .update({ click_count: (data.click_count || 0) + 1 })
      .eq("short_code", code);

    // 3. Send the user to their destination
    redirect(data.original_url);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-600">Link Not Found</h1>
      </div>
    </div>
  );
}