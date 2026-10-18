import { supabase } from "./lib/supabase";

async function getDbData() {
    const { data: questions, error } = await supabase
        .from("vocabulary")
        .select("*");

    if (error) throw new Error("Error fetching backend data ", error);

    return questions
}

export default getDbData; 