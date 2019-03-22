var request = require('request');
var moment = require('moment');

const monSpelling = { 'Jan': 'янв.', 'Feb': 'фев.', 'Mar': 'мар.', 'Apr': 'апр.', 'May': 'мая.', 'Jun': 'июн.', 'Jul': 'июл.', 'Aug': 'авг.', 'Sep': 'сен.', 'Oct': 'окт.', 'Nov': 'ноя.', 'Dec': 'дек.' };
function toMSK(date = Date.now(), gmt = 3) {
  let now = new Date(date).toUTCString().split(' ');
  return `${daySpelling[now[0].slice(0, -1)] /* День недели */}, ${now[1] /* День */} ${monSpelling[now[2]].toLowerCase() /* месяц */} ${now[3] /* Год */} г. ${+now[4].split(':')[0] + gmt /* Часы */}:${now[4].split(':').slice(1).join(':') /* Минуты и секунды */} (МСК)`
};

var rank = {
	PLAYER: {rank: "Игрок", prefix: "", color: ""},
	VIP: {rank: "VIP", prefix: "[VIP] ", color: "00be00"},
	PREMIUM: {rank: "Premium", prefix: "[Premium] ", color: "00dada"},
	HOLY: {rank: "Holy", prefix: "[Holy ]", color: "ffba2d"},
	IMMORTAL: {rank: "Immortal", prefix: "[Immortal] ", color: "e800d5"},
	BUILDER: {rank: "Билдер", prefix: "[Билдер] ", color: "009c00"},
	MAPLEAD: {rank: "Главный билдер", prefix: "[Гл. билдер] ", color: "009c00"},
	YOUTUBE: {rank: "YouTube", prefix: "[YouTube] ", color: "fe3f3f"},
	DEV: {rank: "Разработчик", prefix: "[Dev] ", color: "00bebe"},
	ORGANIZER: {rank: "Организатор", prefix: "[Организатор] ", color: "00bebe"},
	MODER: {rank: "Модератор", prefix: "[Модер] ", color: "1b00ff"},
	WARDEN: {rank: "Проверенный модератор", prefix: "[Пр. Модер] ", color: "1b00ff"},
	CHIEF: {rank: "Главный модератор", prefix: "[Гл. модер] ", color: "1b00ff"},
	ADMIN: {rank: "Главный админ", prefix: "[Гл. админ] ", color: "00bebe"}
}

class VimeLibrary {
	constructor(access_token) {
		this.access_token = access_token;
	}
	returnLastSeen(timestamp) {
		var time = moment.unix(timestamp);
		return toMSK(time.format("DD.MM.YYYY HH:mm:ss"));
	}
	returnReadable(unreadrank) {
		return rank[unreadrank];
	}
	
	getUser(type, arg) {
		if(type === "name") return new Promise((resolve, reject) => {
			request(`http://api.vime.world/user/name/${arg}`, { json: true, headers: { "Access-Token": VimeLibrary.access_token } }, (e, r, b) => {
				if (b.error) { reject(b) }
				resolve(b);
			});
		});
		if(type === "id") return new Promise((resolve, reject) => {
			request(`http://api.vime.world/user/${arg}`, { json: true, headers: { "Access-Token": VimeLibrary.access_token } }, (e, r, b) => {
				if (b.error) { reject(b) }
				resolve(b);
			});
		});
	}
	getFriends(id) { // Только по ID, соррян
		return new Promise((resolve, reject) => {
			request(`http://api.vime.world/user/${id}/friends`, { json: true, headers: { "Access-Token": VimeLibrary.access_token } }, (e, r, b) => {
				if (b.error) { reject(b) }
				resolve(b);
			});
		});
	}
	getSession(id) { // Только по ID, соррян
		return new Promise((resolve, reject) => {
			request(`http://api.vime.world/user/${id}/session`, { json: true, headers: { "Access-Token": VimeLibrary.access_token } }, (e, r, b) => {
				if (b.error) { reject(b) }
				resolve(b);
			});
		});
	}
	getStats(id) { // Только по ID, соррян
		return new Promise((resolve, reject) => {
			request(`http://api.vime.world/user/${id}/stats`, { json: true, headers: { "Access-Token": VimeLibrary.access_token } }, (e, r, b) => {
				if (b.error) { reject(b) }
				resolve(b);
			});
		});
	}
	getAchievements(id) { // Только по ID, соррян
		return new Promise((resolve, reject) => {
			request(`http://api.vime.world/user/${id}/achievements`, { json: true, headers: { "Access-Token": VimeLibrary.access_token } }, (e, r, b) => {
				if (b.error) { reject(b) }
				resolve(b);
			});
		});
	}
	getGuild(type, arg) {
		if(type === "id") return new Promise((resolve, reject) => {
			request(`http://api.vime.world/guild/get?id=${arg}`, { json: true, headers: { "Access-Token": VimeLibrary.access_token } }, (e, r, b) => {
				if (b.error) { reject(b) }
				resolve(b);
			});
		});
		if(type === "name") return new Promise((resolve, reject) => {
			request(`http://api.vime.world/guild/get?name=${arg}`, { json: true, headers: { "Access-Token": VimeLibrary.access_token } }, (e, r, b) => {
				if (b.error) { reject(b) }
				resolve(b);
			});
		});
		if(type === "tag") return new Promise((resolve, reject) => {
			request(`http://api.vime.world/guild/get?tag=${arg}`, { json: true, headers: { "Access-Token": VimeLibrary.access_token } }, (e, r, b) => {
				if (b.error) { reject(b) }
				resolve(b);
			});
		});
	}
	getLeaderTypes() {
		return new Promise((resolve, reject) => {
			request(`http://api.vime.world/leaderboard/list`, { json: true, headers: { "Access-Token": VimeLibrary.access_token } }, (e, r, b) => {
				if (b.error) { reject(b) }
				resolve(b);
			});
		});
	}
	getLeaderBoard(type, sort = null, size = "100") {
		return new Promise((resolve, reject) => {
			if (sort) { var sorturl = `/${sort}` } else { var sorturl = "" }
			request(`http://api.vime.world/leaderboard/get/${type}${sorturl}?size=${size}`, { json: true, headers: { "Access-Token": VimeLibrary.access_token } }, (e, r, b) => {
				if (b.error) { reject(b) }
				resolve(b);
			});
		});
	}
	getOnline() {
		return new Promise((resolve, reject) => {
			request(`http://api.vime.world/online`, { json: true, headers: { "Access-Token": VimeLibrary.access_token } }, (e, r, b) => {
				if (b.error) { reject(b) }
				resolve(b);
			});
		});
	}
	getStreams() {
		return new Promise((resolve, reject) => {
			request(`http://api.vime.world/online/streams`, { json: true, headers: { "Access-Token": VimeLibrary.access_token } }, (e, r, b) => {
				if (b.error) { reject(b) }
				resolve(b);
			});
		});
	}
	getStaff() {
		return new Promise((resolve, reject) => {
			request(`http://api.vime.world/online/staff`, { json: true, headers: { "Access-Token": VimeLibrary.access_token } }, (e, r, b) => {
				if (b.error) { reject(b) }
				resolve(b);
			});
		});
	}
	getGames() {
		return new Promise((resolve, reject) => {
			request(`http://api.vime.world/misc/games`, { json: true, headers: { "Access-Token": VimeLibrary.access_token } }, (e, r, b) => {
				if (b.error) { reject(b) }
				resolve(b);
			});
		});
	}
	getAllAchievements() {
		return new Promise((resolve, reject) => {
			request(`http://api.vime.world/misc/achievements`, { json: true, headers: { "Access-Token": VimeLibrary.access_token } }, (e, r, b) => {
				if (b.error) { reject(b) }
				resolve(b);
			});
		});
	}
}

module.exports = VimeLibrary;
