import InputError from '@/components/InputError';
import InputLabel from '@/components/InputLabel';
import PrimaryButton from '@/components/PrimaryButton';
import TextInput from '@/components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const [avatarPreview, setAvatarPreview] = useState(user.avatar_url);

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            _method: 'patch',
            name: user.name,
            email: user.email,
            profession: user.profession ?? '',
            city: user.city ?? '',
            avatar: null,
        });

    const handleAvatarChange = (e) => {
        const file = e.target.files[0] ?? null;

        setData('avatar', file);

        if (file) {
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('profile.update'), { forceFormData: true, preserveScroll: true });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div>
                    <InputLabel htmlFor="profession" value="Profesi" />

                    <TextInput
                        id="profession"
                        className="mt-1 block w-full"
                        value={data.profession}
                        onChange={(e) => setData('profession', e.target.value)}
                        placeholder="Contoh: Fotografer, Mahasiswa"
                    />

                    <InputError className="mt-2" message={errors.profession} />
                </div>

                <div>
                    <InputLabel htmlFor="city" value="Kota" />

                    <TextInput
                        id="city"
                        className="mt-1 block w-full"
                        value={data.city}
                        onChange={(e) => setData('city', e.target.value)}
                        placeholder="Contoh: Bandar Lampung"
                    />

                    <InputError className="mt-2" message={errors.city} />
                </div>

                <div>
                    <InputLabel htmlFor="avatar" value="Foto Profil" />

                    <div className="mt-1 flex items-center gap-4">
                        {avatarPreview && (
                            <img
                                src={avatarPreview}
                                alt="Foto profil"
                                className="h-16 w-16 rounded-full object-cover"
                            />
                        )}

                        <input
                            id="avatar"
                            type="file"
                            accept="image/png,image/jpeg,image/webp"
                            onChange={handleAvatarChange}
                            className="block w-full text-sm text-gray-600 file:mr-4 file:rounded-md file:border-0 file:bg-gray-100 file:px-4 file:py-2 file:text-sm file:font-medium hover:file:bg-gray-200"
                        />
                    </div>

                    <p className="mt-1 text-xs text-gray-500">JPG, PNG, atau WebP, maksimal 2 MB.</p>

                    <InputError className="mt-2" message={errors.avatar} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
