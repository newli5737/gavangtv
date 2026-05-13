import { prisma } from "./lib/prisma";

async function seed() {
  console.log("🌱 Seeding GavangTV database...");

  // Clear existing data
  await prisma.matchEvent.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.match.deleteMany();

  // Create matches
  const matches = await Promise.all([
    prisma.match.create({
      data: {
        slug: "man-united-vs-chelsea",
        league: "Premier League", leagueIcon: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        homeTeam: "Man United", homeIcon: "🔴", homeScore: 2,
        awayTeam: "Chelsea", awayIcon: "🔵", awayScore: 1,
        minute: "67'", status: "LIVE", hasStream: true, fakeViews: 24583,
      },
    }),
    prisma.match.create({
      data: {
        slug: "barcelona-vs-real-madrid",
        league: "La Liga", leagueIcon: "🇪🇸",
        homeTeam: "Barcelona", homeIcon: "🔵", homeScore: 3,
        awayTeam: "Real Madrid", awayIcon: "⚪", awayScore: 2,
        minute: "82'", status: "LIVE", hasStream: true, fakeViews: 31200,
      },
    }),
    prisma.match.create({
      data: {
        slug: "ac-milan-vs-juventus",
        league: "Serie A", leagueIcon: "🇮🇹",
        homeTeam: "AC Milan", homeIcon: "🔴", homeScore: 1,
        awayTeam: "Juventus", awayIcon: "⚫", awayScore: 1,
        minute: "45+2'", status: "LIVE", hasStream: true, fakeViews: 18900,
      },
    }),
    prisma.match.create({
      data: {
        slug: "bayern-munich-vs-dortmund",
        league: "Bundesliga", leagueIcon: "🇩🇪",
        homeTeam: "Bayern Munich", homeIcon: "🔴", homeScore: 4,
        awayTeam: "Dortmund", awayIcon: "🟡", awayScore: 1,
        minute: "FT", status: "FINISHED", hasStream: false, fakeViews: 22400,
      },
    }),
    prisma.match.create({
      data: {
        slug: "psg-vs-marseille",
        league: "Ligue 1", leagueIcon: "🇫🇷",
        homeTeam: "PSG", homeIcon: "🔵", homeScore: 2,
        awayTeam: "Marseille", awayIcon: "⚪", awayScore: 0,
        minute: "63'", status: "LIVE", hasStream: true, fakeViews: 15600,
      },
    }),
    prisma.match.create({
      data: {
        slug: "liverpool-vs-arsenal",
        league: "Premier League", leagueIcon: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        homeTeam: "Liverpool", homeIcon: "🔴", homeScore: 0,
        awayTeam: "Arsenal", awayIcon: "🔴", awayScore: 0,
        minute: "—", status: "UPCOMING", hasStream: true, fakeViews: 0,
        matchDate: new Date(Date.now() + 3600000 * 3),
      },
    }),
    prisma.match.create({
      data: {
        slug: "man-city-vs-inter-milan",
        league: "Champions League", leagueIcon: "⭐",
        homeTeam: "Man City", homeIcon: "🔵", homeScore: 0,
        awayTeam: "Inter Milan", awayIcon: "🔵", awayScore: 0,
        minute: "—", status: "UPCOMING", hasStream: true, fakeViews: 0,
        matchDate: new Date(Date.now() + 3600000 * 5),
      },
    }),
  ]);

  // Sự kiện Man United vs Chelsea
  const muMatch = matches[0];
  await prisma.matchEvent.createMany({
    data: [
      { matchId: muMatch.id, time: "0'", type: "kickoff", description: "Trận đấu bắt đầu" },
      { matchId: muMatch.id, time: "12'", type: "goal", team: "home", player: "Rashford", description: "Man United ghi bàn! Kiến tạo bởi Fernandes" },
      { matchId: muMatch.id, time: "28'", type: "yellow", team: "away", player: "Kante", description: "Thẻ vàng" },
      { matchId: muMatch.id, time: "35'", type: "goal", team: "home", player: "Martial", description: "Man United ghi bàn! Kiến tạo bởi Sancho" },
      { matchId: muMatch.id, time: "45'", type: "halftime", description: "Hiệp 1 kết thúc — Man United 2-0 Chelsea" },
      { matchId: muMatch.id, time: "45+2'", type: "yellow", team: "home", player: "Casemiro", description: "Thẻ vàng" },
      { matchId: muMatch.id, time: "52'", type: "substitution", team: "away", description: "Havertz ra, Pulisic vào" },
      { matchId: muMatch.id, time: "61'", type: "goal", team: "away", player: "Sterling", description: "Chelsea ghi bàn! Kiến tạo bởi Mount" },
      { matchId: muMatch.id, time: "65'", type: "yellow", team: "away", player: "Silva", description: "Thẻ vàng do phạm lỗi chiến thuật" },
    ],
  });

  // Sự kiện Barcelona vs Real Madrid
  const barcaMatch = matches[1];
  await prisma.matchEvent.createMany({
    data: [
      { matchId: barcaMatch.id, time: "0'", type: "kickoff", description: "El Clásico bắt đầu!" },
      { matchId: barcaMatch.id, time: "15'", type: "goal", team: "home", player: "Yamal", description: "Barcelona ghi bàn!" },
      { matchId: barcaMatch.id, time: "33'", type: "goal", team: "away", player: "Vinícius Jr", description: "Real Madrid gỡ hòa!" },
      { matchId: barcaMatch.id, time: "55'", type: "goal", team: "home", player: "Lewandowski", description: "Barcelona vươn lên dẫn trước!" },
      { matchId: barcaMatch.id, time: "68'", type: "goal", team: "home", player: "Pedri", description: "Barcelona nâng tỷ số!" },
      { matchId: barcaMatch.id, time: "75'", type: "goal", team: "away", player: "Bellingham", description: "Real Madrid rút ngắn tỷ số!" },
    ],
  });

  // Bình luận ảo (tiếng Việt)
  await prisma.comment.createMany({
    data: [
      { matchId: muMatch.id, username: "FanMU_VN", message: "Bàn thắng tuyệt vời của Rashford! 🔥", isVerified: true, isFake: true },
      { matchId: muMatch.id, username: "ChelseaFan23", message: "Chelsea phải phòng ngự tốt hơn", isFake: true },
      { matchId: muMatch.id, username: "BongDaVN", message: "Trận đấu hay quá!", isFake: true },
      { matchId: muMatch.id, username: "QuỷĐỏ_Forever", message: "GGMU! Lên đi United! 💪", isVerified: true, isFake: true },
      { matchId: muMatch.id, username: "Blues_88", message: "Chelsea cố lên! Còn nửa trận nữa", isFake: true },
      { matchId: muMatch.id, username: "NhậnĐịnh_BĐ", message: "Premier League luôn là giải đấu hấp dẫn nhất ⚽", isVerified: true, isFake: true },
      { matchId: muMatch.id, username: "XemBong247", message: "Đường chuyền của Fernandes hoàn hảo quá", isFake: true },
      { matchId: barcaMatch.id, username: "CulerVN", message: "VISCA BARCA!! 🔵🔴 Hay quá anh em!", isVerified: true, isFake: true },
      { matchId: barcaMatch.id, username: "MadridFan99", message: "Hala Madrid! Chưa hết trận mà!", isFake: true },
      { matchId: barcaMatch.id, username: "LaLiga_Fan", message: "El Clásico hay nhất mấy năm qua!", isFake: true },
    ],
  });

  console.log(`✅ Seeded ${matches.length} matches, events, and comments`);
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
