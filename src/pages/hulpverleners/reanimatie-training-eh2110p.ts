export function GET() {
  return new Response(null, {
    status: 301,
    headers: {
      Location: "/hulpverleners/reanimatie-training/",
    },
  });
}
