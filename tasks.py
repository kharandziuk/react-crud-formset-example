from invoke import task
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

CUR_DIR = Path(".")


def run(c, cmd):
    """
    a wrapper to simplify debuging
    """
    SIZE = 50
    print("=" * SIZE)
    print(f"-> {cmd} <-")
    print("=" * SIZE)
    return c.run(cmd)
    print("=" * SIZE)
    print(f"<- {cmd} ->")
    print("=" * SIZE)


@task
def vagrant_up(c):
    run(c, "vagrant up")


@task
def frontend(c):
    build_folder = CUR_DIR / 'build'
    run(
        c,
        'yarn'
    )
    run(
        c,
        'yarn build'
    )
    run(c, 'ls')
    run(
        c,
        "aws s3 cp --recursive "
        f"{build_folder.absolute()} s3://react-crud-formset-example"
    )


@task
def storybook_test(c):
    build_folder = CUR_DIR / 'storybook-static'
    run(
        c,
        'yarn'
    )
    run(
        c,
        f'yarn build-storybook -o {build_folder.absolute()}'
    )
    run(c, 'ls')
    run(
        c,
        f'yarn storybook-puppeteer --serveDirectory {build_folder.absolute()}'
    )
