import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://upfmlmvmdaeuznmishjb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwZm1sbXZtZGFldXpubWlzaGpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg4MTUyNDEsImV4cCI6MjAzNDM5MTI0MX0.aq-TSpSrC_CWrv_fZCicNMUYGxggJLZ6eDDZrCQP_5o";

export const supabase = createClient(supabaseUrl, supabaseKey);
