import { InvitationStatus } from '..';
import supabase from '../../Services/Supabase';

export async function varifyPassword(password) {
	try {
		const { data, error } = await supabase.rpc('verify_user_password', { plain_password: password });
		if (!error) {
			console.log(data);
			return data.success;
		} else {
			console.log(error);
			return false;
		}
	} catch (error) {
		console.log(error);
		return false;
	}
}
export async function getEventDataById(eventIds) {
	try {
		const { data, error } = await supabase.from('Events').select('id,date,name,sendReminder,ownerId,pairingTriggered').in('id', eventIds);
		if (!error) {
			return data;
		} else {
			console.log('Error getting event data : ', error);
		}
	} catch (error) {
		console.log('Error : ', error);
	}
}
export async function fetchEventsJoinedByUser(userEmail) {
	try {
		const { data, error } = await supabase.from('Invites').select('eventId').match({
			email: userEmail,
			status: InvitationStatus.accepted,
		});
		if (error) {
			console.log('Supabase error while getting events : ', error);
			return [];
		} else if (data?.length > 0) {
			const ids = data.map((item) => item.eventId);
			const eventData = await getEventDataById(ids);
			return eventData;
		}
	} catch (error) {
		console.log('Error while getting events : ', error);
		return [];
	}
}
export async function Signout() {
	try {
		const { error } = await supabase.auth.signOut();
		if (!error) {
			return { success: true };
		} else {
			console.log('Error signing out user : ', error);
			return { success: false };
		}
	} catch (error) {
		console.log('Error : ', error);
		return { success: false };
	}
}
export async function UpdateUserProfile(data, userId) {
	try {
		const { error } = await supabase.from('Profiles').update(data).eq('id', userId);
		if (error) {
			console.error(error);
		}
	} catch (error) {
		console.log(error);
	}
}
export async function UploadAvatar(fileName, file, userId) {
	try {
		const { data, error } = await supabase.storage.from('Avatars').upload(`${userId}/${fileName}`, file, {
			upsert: true,
		});
		if (!error && data?.path) {
			const avatar = await getAvatarUrl(data.path);
			if (avatar) {
				const data = { avatar: avatar?.publicUrl };
				await UpdateUserProfile(data, userId);
			}
		} else {
			console.error('Error encountered while uploading avatar : ', error?.message, error);
		}
	} catch (error) {
		console.log('Error : while uploading avatar - ', error);
	}
}
export async function getAvatarUrl(userId) {
	try {
		const { data, error } = await supabase.storage.from('Avatars').getPublicUrl(`${userId}/avatar`);
		if (!error) {
			return data;
		} else {
			console.error(error);
			return null;
		}
	} catch (error) {
		console.log(error);
		return null;
	}
}
